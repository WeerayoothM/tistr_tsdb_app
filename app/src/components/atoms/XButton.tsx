import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { TEXT } from "@/styles/TEXT";
import { COLOR } from "@/styles/COLOR";

const XButton = ({ onPress, title, containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLOR.ORANGE,
        alignSelf: "center",
        padding: 10,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        ...containerStyle,
      }}
    >
      <Text style={{ ...TEXT.button2, color: COLOR.WHITE }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default XButton;
