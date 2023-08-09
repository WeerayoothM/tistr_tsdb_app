import { COLOR } from "./COLOR";
import {
  BaiJamjureeRegular,
  BaiJamjureeSemiBold,
  BaiJamjureeBold,
  BaiJamjureeMedium,
} from "./COMMON";

const commonTextStyle = {
  color: COLOR.BLACK,
};

export const TEXT = {
  header1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 32,
  },
  header2: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 30,
  },
  header3: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 28,
  },
  header4: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 26,
  },
  header5: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 24,
  },
  header6: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 22,
  },
  body1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 20,
  },
  body2: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 18,
  },
  caption1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 16,
  },
  caption1SemiBold: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeSemiBold,
    fontSize: 16,
  },
  caption2: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 14,
  },
  overline: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 16,
    textTransform: "uppercase",
  },
  label1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeMedium,
    fontSize: 16,
  },
  label1Thin: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeRegular,
    fontSize: 16,
  },
  label2Thin: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeRegular,
    fontSize: 14,
  },
  label3Thin: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeRegular,
    fontSize: 10,
  },
  input1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeSemiBold,
    fontSize: 16,
  },
  input2: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeSemiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  badge1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeSemiBold,
    fontSize: 10,
  },
  error1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeSemiBold,
    fontSize: 16,
  },
  button1: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 18,
  },
  button2: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 16,
  },
  header1BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 32,
  },
  header1SemiBOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 32,
  },
  header2BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 30,
  },
  header3BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 28,
  },
  header4BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 26,
  },
  header5BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 24,
  },
  header6BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 22,
  },
  body1BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 20,
  },
  body2BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 18,
  },
  caption1BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 16,
  },
  caption2BOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 14,
  },
  overlineBOLD: {
    ...commonTextStyle,
    fontFamily: BaiJamjureeBold,
    fontSize: 16,
    textTransform: "uppercase",
  },
};
