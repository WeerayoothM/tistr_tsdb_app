import { ImageBackground, ScrollView } from "react-native";

import { Text, View } from "../../src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";

export default function Accout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: COLOR.OFFWHITE }}>
          <ImageBackground
            source={require("../../assets/images/header_search_bg.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: 250,
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
              top: 150,
              height: 100,
              width: "100%",
              zIndex: 2,
            }}
          />
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              paddingTop: 70,
              zIndex: 3,
              backgroundColor: COLOR.TRANSPARENT,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLOR.TRANSPARENT,
              }}
            >
              <Text
                style={{
                  ...TEXT.header1BOLD,
                  color: COLOR.WHITE,
                }}
              >
                สืบค้นข้อมูลโครงการ
              </Text>
            </View>
            <View
              style={{ height: 1000, backgroundColor: COLOR.TRANSPARENT }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
