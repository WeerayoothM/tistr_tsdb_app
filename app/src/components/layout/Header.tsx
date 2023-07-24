import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "@/styles/COLOR";
import { LinearGradient } from "expo-linear-gradient";
import { TEXT } from "@/styles/TEXT";

const Header = ({
  title,
  height = 250,
  rightIcon = false,
  onPressRightIcon = () => {},
}) => {
  const router = useRouter();
  return (
    <View>
      <ImageBackground
        source={require("../../../assets/images/header_search_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: height,
          zIndex: 1,
        }}
        resizeMode="cover"
      />
      <LinearGradient
        // Background Linear Gradient
        pointerEvents="none"
        colors={[COLOR.TRANSPARENT, COLOR.OFFWHITE]}
        locations={[0, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: height - height / 3,
          height: height - (height / 3) * 2,
          width: "100%",
          zIndex: 2,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 3,
          marginTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{ width: 50 }} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLOR.WHITE} />
        </TouchableOpacity>
        <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>{title}</Text>
        {rightIcon ? (
          <TouchableOpacity
            style={{ width: 50, justifyContent: "center" }}
            onPress={onPressRightIcon}
          >
            <Ionicons name="search" size={30} color={COLOR.WHITE} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 50 }} />
        )}
      </View>
    </View>
  );
};

export default Header;
