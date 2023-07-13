import { COLOR } from "./COLOR";
import { TEXT } from "./TEXT";

export const BUTTON = {
  PRIMARY: {
    button: {
      width: 81,
      height: 46,
      backgroundColor: COLOR.GREEN,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    text: { ...TEXT.button1, color: COLOR.WHITE },
  },
  PRIMARY_ICON: {
    button: {
      width: 120,
      height: 48,
      backgroundColor: COLOR.WHITE,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    text: { ...TEXT.button1, color: COLOR.BLACK },
  },
  PRIMARY_OUTLINED: {
    button: {
      width: 81,
      height: 46,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: COLOR.BLACK,
    },
    text: { ...TEXT.button1, color: COLOR.BLACK },
  },
  CIRCLE_LARGE: {
    button: {
      width: 48,
      height: 48,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLOR.BLACK,
    },
    text: { ...TEXT.button1, color: COLOR.WHITE },
  },
  CIRCLE_MEDIUM: {
    button: {
      width: 28,
      height: 28,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLOR.BLACK,
    },
    text: { ...TEXT.button1, color: COLOR.WHITE },
  },
  CIRCLE_SMALL: {
    button: {
      width: 16,
      height: 16,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLOR.BLACK,
    },
    text: { ...TEXT.button1, color: COLOR.WHITE },
  },
};
