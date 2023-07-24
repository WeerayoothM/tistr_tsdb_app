import { View, Text } from "react-native";
import React from "react";
import { useSearchParams } from "expo-router";
import { COLOR } from "@/styles/COLOR";

const DetailPage = () => {
  const { id } = useSearchParams();
  return (
    <View style={{ backgroundColor: COLOR.WHITE }}>
      <Text>DetailPage for : {id}</Text>
    </View>
  );
};

export default DetailPage;
