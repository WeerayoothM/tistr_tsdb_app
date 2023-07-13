import { ImageBackground, ScrollView, TouchableOpacity } from "react-native";

import { Text, View } from "../../src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { FontAwesome } from "@expo/vector-icons";
import { formatDate } from "@/utils/date";
import { StatusBar } from "expo-status-bar";

export default function TabDashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ backgroundColor: COLOR.OFFWHITE }}>
          <ImageBackground
            source={require("../../assets/images/header_bg.png")}
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
              zIndex: 3,
              backgroundColor: COLOR.TRANSPARENT,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: COLOR.TRANSPARENT,
              }}
            >
              <Text style={{ ...TEXT.header1BOLD, color: COLOR.WHITE }}>
                แดชบอร์ด
              </Text>
              <TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: COLOR.PINK,
                    borderRadius: 50,
                    width: 13,
                    height: 13,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 3,
                    right: 0,
                    top: -5,
                  }}
                >
                  <Text
                    style={{ ...TEXT.badge1, color: COLOR.WHITE, fontSize: 8 }}
                  >
                    2
                  </Text>
                </View>
                <FontAwesome name="bell" size={24} color={COLOR.WHITE} />
              </TouchableOpacity>
            </View>
            <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
              วัน{formatDate()}
            </Text>
            <View
              style={{ height: 1000, backgroundColor: COLOR.TRANSPARENT }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
