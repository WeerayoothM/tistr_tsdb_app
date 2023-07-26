import React from "react";
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
  animationType?: "none" | "fade" | "slide";
  containerStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  transparent?: boolean;
}

const XModal = (props: Props) => {
  const {
    visible = false,
    onClose = () => {},
    children,
    animationType = "fade",
    containerStyle = {},
    backdropStyle = {},
    transparent = true,
  } = props;
  const close = () => {
    onClose();
  };
  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={close}
    >
      <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          },
          containerStyle,
        ]}
      >
        <TouchableWithoutFeedback onPress={close}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
              backdropStyle,
            ]}
          />
        </TouchableWithoutFeedback>
        <View>{children}</View>
      </View>
    </Modal>
  );
};

export default XModal;
