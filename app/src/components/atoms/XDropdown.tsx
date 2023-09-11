import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";

export interface Option {
  value: string | number;
  label: string;
}

const XDropdown = (props) => {
  const {
    options = [
      { label: "โครงการวิจัยเสร็จสิ้น", value: "โครงการวิจัยเสร็จสิ้น" },
      {
        label: "โครงการวิจัยเสร็จสิ้น (ต่อเนื่องที่ดำเนินการต่อในปีถัดไป)",
        value: "โครงการวิจัยเสร็จสิ้น (ต่อเนื่องที่ดำเนินการต่อในปีถัดไป)",
      },
      { label: "ดำเนินการตามแผน", value: "ดำเนินการตามแผน" },
    ],
    labelText = "test",
    labelStyle = {},
    defaultValue,
    onValueChange,
    placeHolder = "Name",
    containerStyle = {},
    dropDownContainerStyle = {},
    zIndex = 999,
    listMode = "MODAL",
    dependencyValue = "CONTSTANT",
  } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | Option>(defaultValue);

  useEffect(() => {
    if (value || value === "") {
      onValueChange(typeof value === "object" ? String(value.value) : value);
    }
  }, [value]);

  useEffect(() => {
    if (value && dependencyValue == "") {
      setValue("");
    }
  }, [dependencyValue]);

  return (
    <View style={[containerStyle, { zIndex: open ? zIndex : 0 }]}>
      {labelText ? (
        <Text
          style={[
            { ...TEXT.label3Thin, color: COLOR.DARKGRAY, marginBottom: 5 },
            labelStyle,
          ]}
        >
          {labelText}
        </Text>
      ) : (
        <></>
      )}
      <DropDownPicker
        listMode={listMode}
        open={open}
        value={value as ValueType}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeHolder}
        style={[
          {
            borderRadius: 8,
            borderWidth: 0,
            borderColor: COLOR.LIGHTGRAY,
            backgroundColor: COLOR.WHITE,
            minHeight: 40,
            flex: 1,
          },
        ]}
        labelStyle={{
          ...TEXT.input3,
          color: !value?.toString() ? COLOR.LIGHTGRAY : COLOR.BLACK,
        }}
        placeholderStyle={{
          ...TEXT.input3,
          paddingLeft: 3,
          color: COLOR.LIGHTGRAY,
        }}
        containerStyle={[dropDownContainerStyle, { zIndex: open ? zIndex : 0 }]}
        dropDownContainerStyle={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: COLOR.LIGHTGRAY,
        }}
        listItemLabelStyle={{
          ...TEXT.input2,
          color: COLOR.GRAY,
        }}
        selectedItemLabelStyle={{
          color: COLOR.BLACK,
        }}
        showTickIcon={false}
        itemSeparator={true}
        itemSeparatorStyle={{
          backgroundColor: COLOR.LIGHTGRAY2,
        }}
        listItemContainerStyle={{
          marginVertical: 5,
        }}
        ArrowDownIconComponent={() => (
          <View style={{ height: 16, width: 16 }}>
            <AntDesign name="down" size={16} color={COLOR.ORANGE} />
          </View>
        )}
      />
    </View>
  );
};

export default XDropdown;
