import { COLOR } from "@/styles/COLOR";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RXIcon } from "rn-rx-icons";

interface Props {
  direction: string;
}

const RenderArrow = (props: Props) => {
  const { direction } = props;

  return (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
      }}
    >
      {direction === "left" ? (
        <RXIcon name="ArrowShortLeft" color={COLOR.DARKGREEN} />
      ) : (
        <RXIcon name="ArrowShortRight" color={COLOR.DARKGREEN} />
      )}
    </View>
  );
};

export default RenderArrow;

const styles = StyleSheet.create({});
