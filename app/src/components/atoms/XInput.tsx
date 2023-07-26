import {
  View,
  Text,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  labelText?: string;
  labelStyle?: StyleProp<TextStyle>;
  required?: boolean;
  textProps?: TextInputProps;
  passwordVisible?: boolean;
  setPasswordVisible?: (state: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  type?: "normal" | "success" | "error";
  enableCheckMark?: boolean;
  enableAlertMark?: boolean;
  errorMessage?: string | null;
  checkTrigger?: boolean;
  errorTrigger?: boolean;
  rightIcon?: boolean;
  rightIconType?: string;
  rightIconPress?: () => void;
  rightIconName?: any;
  rightIconColor?: string;
  enabled?: boolean;
}

const XInput = ({
  labelText,
  containerStyle,
  textProps,
  labelStyle,
  rightIcon = true,
  rightIconType,
  rightIconPress = () => {},
  rightIconName = "search",
  rightIconColor = COLOR.GRAY,
  enabled = true,
}: Props) => {
  return (
    <View style={[containerStyle, { zIndex: 1 }]}>
      <Text style={[{ ...TEXT.label3Thin, color: COLOR.DARKGRAY }, labelStyle]}>
        {labelText}
      </Text>
      <View
        style={{
          // width: 260,
          height: 40,
          backgroundColor: COLOR.WHITE,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 13,
          marginTop: 5,
          // flex: 1,
        }}
      >
        {/* <Ionicons name="lock-closed" size={18} color="gray" />
          <View
            style={{
              width: 10,
            }}
          /> */}
        <TextInput
          placeholderTextColor={COLOR.LIGHTGRAY}
          style={{
            ...TEXT.input2,
            flex: 1,
            flexGrow: 1,
          }}
          autoCapitalize="none"
          enabled={false}
          editable={enabled}
          {...textProps}
        />
        {rightIcon ? (
          <TouchableOpacity onPress={rightIconPress}>
            {rightIconType === "FontAwesome5" ? (
              <FontAwesome5
                name={rightIconName}
                size={18}
                color={rightIconColor}
              />
            ) : (
              <Ionicons name={rightIconName} size={18} color={rightIconColor} />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default XInput;
