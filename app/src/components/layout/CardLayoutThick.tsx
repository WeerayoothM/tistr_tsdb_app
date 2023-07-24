import {
  View,
  Text,
  StyleProp,
  ViewProps,
  ViewStyle,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { ReactComponentElement } from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";

const CardLayoutThick = ({
  containerStyle = {},
  headerHeight = 60,
  themeColor = COLOR.BLUE,
  children,
  leftHeader,
  rightHeader,
  onlyHeader = false,
  isCollapsible = false,
  isCollapsed = false,
  onPressHeader = () => {},
}: {
  containerStyle?: ViewStyle;
  headerHeight?: number;
  themeColor?: string;
  children?: React.ReactNode;
  leftHeader: string;
  rightHeader: string;
  onlyHeader?: boolean;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onPressHeader?: () => void; // React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const headerBgMapping = {
    [COLOR.BLUE]: require("../../../assets/images/card_header_thick_blue_bg.png"),
    [COLOR.PURPLE]: require("../../../assets/images/card_header_thick_purple_bg.png"),
    [COLOR.ORANGE]: require("../../../assets/images/card_header_thick_orange_bg.png"),
    [COLOR.GREEN]: require("../../../assets/images/card_header_thick_green_bg.png"),
  };
  return (
    <Pressable
      style={{
        borderRadius: 10,
        width: "100%",
      }}
      onPress={onPressHeader}
    >
      <View
        style={{
          minHeight: headerHeight,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={headerBgMapping[themeColor]}
          resizeMode="cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          imageStyle={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius:
              onlyHeader || (isCollapsible && !isCollapsed) ? 8 : 0,
            borderBottomRightRadius:
              onlyHeader || (isCollapsible && !isCollapsed) ? 8 : 0,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ ...TEXT.caption1BOLD, color: COLOR.WHITE }}>
            {leftHeader}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
              {rightHeader}
            </Text>

            {isCollapsible ? (
              isCollapsed ? (
                <View style={{ marginLeft: 14 }}>
                  <AntDesign name="up" size={18} color={COLOR.WHITE} />
                </View>
              ) : (
                <View style={{ marginLeft: 14 }}>
                  <AntDesign name="down" size={18} color={COLOR.WHITE} />
                </View>
              )
            ) : (
              <></>
            )}
          </View>
        </View>
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
    </Pressable>
  );
};

export default CardLayoutThick;
