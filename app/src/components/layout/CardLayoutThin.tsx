import {
  View,
  Text,
  StyleProp,
  ViewProps,
  ViewStyle,
  Image,
} from "react-native";
import React, { ReactComponentElement } from "react";
import { COLOR } from "@/styles/COLOR";

const CardLayoutThin = ({
  containerStyle = {},
  headerHeight = 12,
  themeColor = COLOR.BLUE,
  children,
}: {
  containerStyle?: ViewStyle;
  headerHeight?: number;
  themeColor?: string;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          // backgroundColor: themeColor,
          height: headerHeight,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          // backgoundI
        }}
      >
        <Image
          source={
            themeColor === COLOR.BLUE
              ? require("../../../assets/images/card_header_thin_blue_bg.png")
              : require("../../../assets/images/card_header_thin_purple_bg.png")
          }
          resizeMode="cover"
          style={{
            width: "100%",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          ...containerStyle,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CardLayoutThin;
