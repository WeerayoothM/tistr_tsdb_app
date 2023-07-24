import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";
import { formatDateToThaiDate } from "@/utils/format";

const Summary = ({}) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 27,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
      <Text style={{ ...TEXT.caption1SemiBold, textAlign: "center" }}>
        รายงานการเบิกจ่ายงบประมาณตลอดโครงการ
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...TEXT.header1, color: COLOR.DARKGREEN2 }}>
          อีก 25 วัน
        </Text>
      </View>
    </View>
  );
};

export default Summary;
