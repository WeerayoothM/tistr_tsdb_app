import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../../../../styles/COLOR';
import { TEXT } from '../../../../styles/TEXT';
import { toMonthYear } from '../../../../utils';

const RenderHeader = (date: string) => {
  return (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 0,
      }}
    >
      <Text style={{ ...TEXT.body1BOLD }}>{toMonthYear(date)}</Text>
    </View>
  );
};

export default RenderHeader;

const styles = StyleSheet.create({});
