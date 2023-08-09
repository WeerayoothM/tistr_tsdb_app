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

const CardLayoutThinVertical = ({
  containerStyle = {},
  headerContainerStyle = {},
  headerWidth = 12,
  themeColor = COLOR.BLUE,
  children,
}: {
  containerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  headerWidth?: number;
  themeColor?: string;
  children: React.ReactNode;
}) => {
  const headerBgMapping = {
    [COLOR.BLUE]: require("../../../assets/images/card_header_thin_vertical_blue_bg.png"),
    [COLOR.PURPLE]: require("../../../assets/images/card_header_thin_vertical_purple_bg.png"),
    // [COLOR.GREEN]: require("../../../assets/images/card_header_thin_green_bg.png"),
  };
  return (
    <View
      style={{
        borderRadius: 10,
        width: "100%",
        flexDirection: "row",
        flex: 1,
        ...headerContainerStyle,
      }}
    >
      <View
        style={{
          // backgroundColor: themeColor,
          width: headerWidth,
          height: "100%",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Image
          source={headerBgMapping[themeColor]}
          resizeMode="cover"
          style={{
            height: "100%",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          flexGrow: 1,
          ...containerStyle,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CardLayoutThinVertical;
