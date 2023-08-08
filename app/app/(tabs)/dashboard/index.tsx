import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { FontAwesome } from "@expo/vector-icons";
import { formatDateToThaiDate } from "@/utils/format";
import XDropdown from "@/components/atoms/XDropdown";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

export default function TabDashboardScreen() {
  const [selectYear, setSelectYear] = useState("");
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: COLOR.OFFWHITE }}>
          <ImageBackground
            source={require("../../../assets/images/header_bg.png")}
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
              flex: 1,
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
              <Link href="dashboard/notification" asChild>
                {/* <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable> */}
                <TouchableOpacity
                // onPress={() => router.push("dashboard/notification")}
                >
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
                      style={{
                        ...TEXT.badge1,
                        color: COLOR.WHITE,
                        fontSize: 8,
                      }}
                    >
                      2
                    </Text>
                  </View>
                  <FontAwesome name="bell" size={24} color={COLOR.WHITE} />
                </TouchableOpacity>
              </Link>
            </View>
            <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
              วัน{formatDateToThaiDate()}
            </Text>
            <XDropdown
              labelText=""
              defaultValue={`${Number(new Date().getFullYear()) + 543}`}
              onValueChange={(value) => {
                setSelectYear(value);
              }}
              options={[
                {
                  label: "พ.ศ. 2566",
                  value: "2566",
                },
                {
                  label: "พ.ศ. 2565",
                  value: "2565",
                },
              ]}
              dropDownContainerStyle={{ width: 130, alignSelf: "flex-end" }}
              zIndex={999}
            />
            <View
              style={{
                flex: 1,
                // flexGrow: 1,
                backgroundColor: COLOR.TRANSPARENT,
                marginTop: 20,
                zIndex: 0,
              }}
            >
              <Image
                source={require("../../../assets/images/dashboard_count_all_project.png")}
                style={{ width: "100%", resizeMode: "cover" }}
                // resizeMode="cover"
              />
              <View style={{ flexDirection: "row", gap: 5 }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require("../../../assets/images/dashboard_count_offbudget_project.png")}
                    style={{ width: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require("../../../assets/images/dashboard_count_onbudget_project.png")}
                    style={{ width: "100%" }}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Image
                source={require("../../../assets/images/dashboard_stat.png")}
                style={{ width: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
