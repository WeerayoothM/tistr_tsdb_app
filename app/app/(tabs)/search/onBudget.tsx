import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/layout/Header";

const onBudget = () => {
  return (
    <View>
      <Header title={"สืบค้นข้อมูลโครงการ"} height={150} />
      <Text>onBudget</Text>
    </View>
  );
};

export default onBudget;
