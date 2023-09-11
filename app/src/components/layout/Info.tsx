import { View, Text } from "react-native";
import React from "react";
import { TEXT } from "@/styles/TEXT";
import { COLOR } from "@/styles/COLOR";

const Info = ({ label, info = null }) => {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
      <Text style={{ ...TEXT.label2Thin, color: COLOR.DARKGRAY }}>{label}</Text>
      <Text style={{ ...TEXT.body2, color: COLOR.BLUE, lineHeight: 30 }}>
        {info !== null && info.toString().trim() !== ""
          ? info.toString().trim()
          : "-"}
      </Text>
    </View>
  );
};

export default Info;
