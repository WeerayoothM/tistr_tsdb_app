import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Input } from "antd";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

import dayjs from "dayjs";
import th from "date-fns/locale/th";
import "dayjs/locale/th";
dayjs.locale("th");

registerLocale("th", th);
setDefaultLocale("th");

const months = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const CustomInput = ({
  value,
  onClick,
  placeholderName,
  displayFormat,
  style,
  props,
}: any) => {
  let thaiDate = "";
  if (value !== "") {
    const date = dayjs(value);
    const thaiYear = date.year() + 543;
    const wrappedDisplayFormat = displayFormat
      ? displayFormat.replace(/YYYY/, thaiYear).replace(/YY/, thaiYear % 100)
      : null;
    thaiDate =
      (wrappedDisplayFormat && `${date.format(wrappedDisplayFormat)}`) ||
      `${thaiYear}${date.format("-MM-DD")}`;
  }
  return (
    <div className="">
      <input
        value={thaiDate}
        placeholder={"วว/ดด/ปปปป (พ.ศ.)"}
        style={style}
        readOnly
        {...props}
        className="cursor-pointer outline-none text-[#666666] font-srb-400 placeholder:text-[#ADB5BD] border-none bg-white rounded-[11px] px-[1rem] py-[1.25rem] w-full text-[16px]"
        onClick={onClick}
      />
    </div>
  );
};

const InputWrapper = (props: any, ref: any) => (
  <div ref={ref}>
    <CustomInput {...props} />
  </div>
);
const CustomInputWrapper = React.forwardRef(InputWrapper);

const headerStyle = {
  margin: 10,
  display: "flex",
  justifyContent: "space-between",
};

export const range = (startVal = 0, endVal = 0, increment = 0) => {
  let list: any[] = [];
  if (increment <= 0) {
    return list;
  }
  for (let index = startVal; index <= endVal; index = index + increment) {
    list = [...list, index];
  }
  return list;
};

export const WatDatePicker = (props: any) => {
  const [value, setValue] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );

  useEffect(() => {
    setSelectedDate(props.value ? new Date(props.value) : null);
  }, [props.value]);

  const yearBoundary = props.yearBoundary ?? 99;
  const thisYear = dayjs().year();
  const minYear = props.minDate
    ? dayjs(props.minDate).year()
    : thisYear - yearBoundary;
  const maxYear = props.maxDate
    ? dayjs(props.maxDate).year()
    : thisYear + yearBoundary;
  const years = range(minYear, maxYear, 1);

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-today": [new Date()],
    },
  ];
  return (
    <DatePicker
      locale="th"
      rend
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div style={headerStyle}>
          <button
            className="borderless"
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <LeftOutlined />
          </button>

          <select
            className="borderless"
            value={months[dayjs(date).month()]}
            onChange={({ target }) => changeMonth(months.indexOf(target.value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="borderless"
            value={dayjs(date).year()}
            onChange={(e) => changeYear(Number(e.target.value))}
          >
            {years.map((option: any) => (
              <option key={option} value={option}>
                {option + 543}
              </option>
            ))}
          </select>

          <button
            className="borderless"
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <RightOutlined />
          </button>
        </div>
      )}
      minDate={props.minDate ? new Date(props.minDate) : null}
      maxDate={props.maxDate ? new Date(props.maxDate) : null}
      dateFormat={props.dateFormat ? props.dateFormat : "yyyy-MM-dd"}
      selected={selectedDate}
      isClearable={
        !(props.disabled || props.readOnly) && (props.clearable ?? true)
      }
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={(date) => {
        setSelectedDate(date);
        const dayjsObj = dayjs(date).isValid() ? dayjs(date) : null;
        setValue(dayjsObj ? dayjsObj.format("YYYY-MM-DD") : "");
        const thaiDate = dayjsObj
          ? `${dayjsObj.year() + 543}${dayjsObj.format("-MM-DD")}`
          : "";
        props.onChange(
          dayjsObj ? dayjsObj.format("YYYY-MM-DD") : "",
          thaiDate,
          props.name
        );
      }}
      highlightDates={highlightWithRanges}
      customInput={
        <CustomInputWrapper
          placeholderName={props.placeholder}
          displayFormat={props.displayFormat}
          style={props.inputStyle}
          {...props.inputProps}
        />
      }
      {...props.reactDatePickerProps}
    />
  );
};
