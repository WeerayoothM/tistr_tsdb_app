import { Link } from "expo-router";
import { View, Text, ImageBackground, TextInput, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../src/context/AuthProvider";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/styles/COMMON";
import { TEXT } from "@/styles/TEXT";
import { COLOR } from "@/styles/COLOR";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

const image = require("../../assets/images/login_bg.png");

export default function Login() {
  const { setUser } = useAuth();
  const [securePassword, setSecurePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      setErrorMessage("");
      setLoading(true);

      if (!username || !password) {
        setErrorMessage("Username or password is invalid");
        return;
      }

      const payload = {
        username,
        password,
      };
      const resp = await axios.post(
        "https://tsdb.duckdns.org:3022/login",
        payload
      );

      const data = resp.data;

      if (isEmpty(data)) {
        setUser(null);
        setErrorMessage("Username or password is invalid");
      }
      {
        setUser(data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong");
    }
  };

  // "@expo/vector-iConstants.expoConfig": "^13.0.0",
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}
    >
      <ImageBackground
        source={image}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      >
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            alignItems: "center",
          }}
        >
          <View style={{ flexGrow: 1, justifyContent: "center" }}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: COLOR.WHITE,
                borderRadius: 31,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                height: 45,
              }}
            />
            <View>
              <Text
                style={{
                  ...TEXT.label1,
                  color: COLOR.WHITE,
                }}
              >
                ชื่อผู้ใช้งาน
              </Text>
              <View
                style={{
                  height: 7,
                }}
              />
              <View
                style={{
                  width: 260,
                  height: 40,
                  backgroundColor: COLOR.WHITE,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 13,
                }}
              >
                <Ionicons name="person" size={18} color="gray" />

                <View
                  style={{
                    width: 10,
                  }}
                />
                <TextInput
                  placeholder="ชื่อผู้ใช้งาน"
                  style={{
                    ...TEXT.input2,
                    flexGrow: 1,
                  }}
                  autoCapitalize="none"
                  onChangeText={(value: string) => {
                    setUsername(value);
                  }}
                />
              </View>
              <View
                style={{
                  height: 9,
                }}
              />
              <Text style={{ ...TEXT.label1, color: COLOR.WHITE }}>
                รหัสผ่าน
              </Text>
              <View
                style={{
                  height: 7,
                }}
              />
              <View
                style={{
                  width: 260,
                  height: 40,
                  backgroundColor: COLOR.WHITE,
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 13,
                  // flex: 1,
                }}
              >
                <Ionicons name="lock-closed" size={18} color="gray" />
                <View
                  style={{
                    width: 10,
                  }}
                />
                <TextInput
                  placeholder="รหัสผ่าน"
                  secureTextEntry={securePassword}
                  style={{
                    ...TEXT.input2,
                    flex: 1,
                    flexGrow: 1,
                  }}
                  autoCapitalize="none"
                  onChangeText={(value: string) => {
                    setPassword(value);
                  }}
                />

                <TouchableOpacity
                  onPress={() => setSecurePassword(!securePassword)}
                >
                  {securePassword ? (
                    <Ionicons name="eye" size={18} color="gray" />
                  ) : (
                    <Ionicons name="eye-off" size={18} color="gray" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: 50,
              }}
            >
              {errorMessage && (
                <Text
                  style={{
                    ...TEXT.error1,
                    color: COLOR.ORANGE,
                    // borderBottomWidth: 1,
                    // lineHeight: 8,
                  }}
                >
                  {errorMessage}!
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={login}
              style={{
                backgroundColor: "#FFA500",
                alignSelf: "center",
                padding: 10,
                borderRadius: 8,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={{ ...TEXT.button2, color: COLOR.WHITE }}>
                ลงชื่อเข้าใช้
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../assets/images/login_logo_bottom.png")}
            style={{ height: 50, width: 300 }}
            resizeMode="contain"
          />
          <View
            style={{
              height: 30,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
