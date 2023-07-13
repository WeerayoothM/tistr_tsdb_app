import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { COLOR } from "../../../../styles/COLOR";

const Title = (props: {
  title: string;
  required: boolean;
  titleStyle: StyleProp<TextStyle>;
}) => {
  const { title, required, titleStyle } = props;

  if (!title) {
    return <></>;
  }

  return (
    <Text
      style={[
        titleStyle,
        {
          marginTop: 10,
          color: COLOR.BLACK,
        },
      ]}
    >
      {title}
      {required && (
        <Text
          style={{
            color: COLOR.PINK,
          }}
        >
          {" "}
          *
        </Text>
      )}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({});
