import { View, Text } from "react-native";
import { useAuth } from "../../src/context/AuthProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Accout() {
  const { user, setUser } = useAuth();

  const InfoComponent = ({ label, info = "-" }) => {
    return (
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ ...TEXT.label2Thin, color: COLOR.DARKGRAY }}>
          {label}
        </Text>
        <Text style={{ ...TEXT.body2, color: COLOR.BLUE, lineHeight: 28 }}>
          {info.toString().trim()}
        </Text>
      </View>
    );
  };

  const logout = () => {
    setUser(null);
  };

  if (!user) {
    return <></>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
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
              zIndex: 3,
              backgroundColor: COLOR.TRANSPARENT,
              flex: 1,
              justifyContent: "space-between",
              paddingBottom: 40,
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: COLOR.TRANSPARENT,
                  marginTop: 40,
                  marginBottom: 70,
                }}
              >
                <Text
                  style={{
                    ...TEXT.header1BOLD,
                    color: COLOR.WHITE,
                  }}
                >
                  บัญชีของฉัน
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: COLOR.WHITE,
                  // paddingVertical: 20,
                }}
              >
                <InfoComponent
                  label={"ชื่อ-สกุล"}
                  info={`${user.FName} ${user.LName}`}
                />
                {/* <View style></View> */}
                <View
                  style={{
                    borderBottomColor: COLOR.LIGHTGRAY2,
                    borderBottomWidth: 1,
                  }}
                />
                <InfoComponent label={"หน่วยงาน"} info={user.Division} />
                <View
                  style={{
                    borderBottomColor: COLOR.LIGHTGRAY2,
                    borderBottomWidth: 1,
                  }}
                />
                <InfoComponent label={"ตำแหน่งงาน"} info={user.Position} />
                <View
                  style={{
                    borderBottomColor: COLOR.LIGHTGRAY2,
                    borderBottomWidth: 1,
                  }}
                />
                <InfoComponent label={"รหัสประจำตัว"} info={user.EmpId} />
                <View
                  style={{
                    borderBottomColor: COLOR.LIGHTGRAY2,
                    borderBottomWidth: 1,
                  }}
                />
                <InfoComponent label={"ชื่อผู้ใช้งาน"} info={user.Username} />
              </View>
            </View>
            <View style={{ height: 20 }} />

            <TouchableOpacity
              onPress={logout}
              style={{
                backgroundColor: COLOR.ORANGE,
                alignSelf: "center",
                padding: 10,
                borderRadius: 8,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SimpleLineIcons name="logout" size={24} color={COLOR.WHITE} />
              <View style={{ width: 17 }} />
              <Text style={{ ...TEXT.button2, color: COLOR.WHITE }}>
                ออกจากระบบ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
