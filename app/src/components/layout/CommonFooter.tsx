import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CommonFooter = ({ bottom = 100 }) => {
  const insets = useSafeAreaInsets();
  return <View style={{ marginBottom: insets.bottom + bottom }} />;
};

export default CommonFooter;

const styles = StyleSheet.create({});
