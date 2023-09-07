export const formatDateToThaiDate = (
  _date: string | Date = new Date(),
  withComma: boolean = false,
  withWeekDay: boolean = true,
  withYearUnit: boolean = false,
  plusToThaiYear: boolean = false
) => {
  var month = new Array();
  month[0] = "ม.ค.";
  month[1] = "ก.พ.";
  month[2] = "มี.ค.";
  month[3] = "เม.ย.";
  month[4] = "พ.ค.";
  month[5] = "มิ.ย.";
  month[6] = "ก.ค.";
  month[7] = "ส.ค.";
  month[8] = "ก.ย.";
  month[9] = "ต.ค.";
  month[10] = "พ.ย.";
  month[11] = "ธ.ค.";

  var weekDay = new Array();
  weekDay[0] = "อาทิตย์";
  weekDay[1] = "จันทร์";
  weekDay[2] = "อังคาร";
  weekDay[3] = "พุธ";
  weekDay[4] = "พฤหัสบดี";
  weekDay[5] = "ศุกร์";
  weekDay[6] = "เสาร์";

  let date: Date;
  if (typeof _date === typeof "") {
    const dateString = _date as string;
    date = new Date(dateString.split("+")?.[0]);
  } else {
    date = new Date(_date);
  }
  date.getDay;
  return `${withWeekDay ? weekDay[date.getDay()] : ""} ${(
    "0" + date.getDate()
  ).slice(-2)}${withComma ? "," : ""} ${month[date.getMonth()]}${
    withYearUnit ? " พ.ศ. " : " "
  }${plusToThaiYear ? date.getFullYear() + 543 : date.getFullYear()}`.trim();
};

export function numberWithCommas(x, d = "-") {
  // d = default
  return !x ? d : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getMonthString(monthNum, lang) {
  let month = new Array();
  if (lang === "TH") {
    month[0] = "ม.ค.";
    month[1] = "ก.พ.";
    month[2] = "มี.ค.";
    month[3] = "เม.ย.";
    month[4] = "พ.ค.";
    month[5] = "มิ.ย.";
    month[6] = "ก.ค.";
    month[7] = "ส.ค.";
    month[8] = "ก.ย.";
    month[9] = "ต.ค.";
    month[10] = "พ.ย.";
    month[11] = "ธ.ค.";
  } else if (lang === "EN") {
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
  }
  return month[Number(monthNum) - 1];
}
