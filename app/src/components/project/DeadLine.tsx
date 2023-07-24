import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";
import { formatDateToThaiDate } from "@/utils/format";

const DeadLine = ({ end_date = "" }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 27,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Text style={{ ...TEXT.caption2 }}>วันสิ้นสุดโครงการ</Text>
          <Text style={{ ...TEXT.body2, color: COLOR.DARKGRAY }}>
            {formatDateToThaiDate(end_date, false, false, true)}
          </Text>
        </View>

        <Text style={{ ...TEXT.header1, color: COLOR.DARKGREEN2 }}>
          อีก 25 วัน
        </Text>
      </View>
    </View>
  );
};

export default DeadLine;
