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
  const headerBgMapping = {
    [COLOR.BLUE]: require("../../../assets/images/card_header_thin_blue_bg.png"),
    [COLOR.PURPLE]: require("../../../assets/images/card_header_thin_purple_bg.png"),
    [COLOR.ORANGE]: require("../../../assets/images/card_header_thin_orange_bg.png"),
    [COLOR.DARKGREEN2]: require("../../../assets/images/card_header_thin_green_bg.png"),
    [COLOR.PINK]: require("../../../assets/images/card_header_thin_pink_bg.png"),
  };
  return (
    <View
      style={{
        borderRadius: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: themeColor,
          height: headerHeight,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Image
          source={headerBgMapping[themeColor]}
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
