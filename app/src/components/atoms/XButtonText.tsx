import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { TEXT } from "@/styles/TEXT";
import { COLOR } from "@/styles/COLOR";

const XButtonText = ({ onPress, title, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 10,
        ...containerStyle,
      }}
    >
      <Text style={{ ...TEXT.label1, color: COLOR.ORANGE }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default XButtonText;
