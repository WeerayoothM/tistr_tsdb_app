import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR } from "../../../styles/COLOR";
import { TEXT } from "../../../styles/TEXT";
import Title from "./components/Title";

interface Props {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  required?: boolean;
  textProps: TextInputProps;
  passwordVisible?: boolean;
  setPasswordVisible?: (state: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  type: "normal" | "success" | "error";
  enableCheckMark?: boolean;
  enableAlertMark?: boolean;
  errorMessage?: string | null;
  checkTrigger?: boolean;
  errorTrigger?: boolean;
}

const XInput = (props: Props) => {
  const {
    title = null,
    titleStyle = { ...TEXT.body1 },
    required = false,
    textProps,
    passwordVisible = null,
    setPasswordVisible = (state) => {},
    containerStyle,
    type,
    enableCheckMark = true,
    enableAlertMark = true,
    errorMessage = null,
  } = props;
  const bgInput = type === "success" ? COLOR.WHITE : COLOR.OFFWHITE;

  const isPasswordInput = passwordVisible !== null;

  const getBorderColor = () => {
    if (type === "success" && enableCheckMark) return COLOR.GREEN;
    else if (type === "error" && enableAlertMark) return COLOR.PINK;
    return COLOR.LIGHTGRAY;
  };

  return (
    <View style={{ marginBottom: errorMessage && enableAlertMark ? 11 : 0 }}>
      <Title title={title} titleStyle={titleStyle} required={required} />
      <View
        style={[
          styles.inputContainer,
          {
            minHeight: 50,
            backgroundColor: bgInput,
            borderColor: getBorderColor(),
          },
          containerStyle,
        ]}
      >
        <TextInput
          secureTextEntry={!!passwordVisible}
          placeholderTextColor={COLOR.GRAY}
          autoCorrect={false}
          autoCapitalize="none"
          {...textProps}
          style={[
            textProps.style,
            {
              ...TEXT.body1,
              flex: 1,
              textAlignVertical: "top",
            },
          ]}
        />
        {isPasswordInput && (
          <TouchableOpacity
            style={{
              marginRight:
                !enableCheckMark && !enableAlertMark
                  ? 0
                  : type === "success" || type === "error"
                  ? 8
                  : 32,
              alignSelf: "center",
              paddingTop: 4,
            }}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            {/* <RXIcon
              name={passwordVisible ? "EyeOff" : "EyeOn"}
              color={COLOR.DARKGRAY}
            /> */}
          </TouchableOpacity>
        )}
        {type === "success" && enableCheckMark && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* <RXIcon name="CheckCircle" color={COLOR.GREEN} /> */}
          </View>
        )}
        {type === "error" ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* <RXIcon name="Warning" color={COLOR.PINK} size={24} /> */}
          </View>
        ) : null}
      </View>
      {errorMessage && (
        <Text style={{ ...TEXT.caption2, color: COLOR.PINK, marginTop: -5 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default XInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
