import { SCREEN_HEIGHT } from "@/styles/COMMON";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

interface Props {
  active: boolean;
  children: JSX.Element | JSX.Element[];
  duration?: number;
  height: number;
}

const XSlideUp = ({
  active,
  children,
  height = SCREEN_HEIGHT * 0.8,
  duration = 400,
}: Props) => {
  const [anim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (active) {
      Animated.timing(anim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);

  return (
    <Animated.View
      style={{
        // position: "absolute",
        backgroundColor: "white",
        width: "100%",
        height: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, height],
        }),
        bottom: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        // paddingBottom: insets.bottom,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default XSlideUp;

const styles = StyleSheet.create({});
