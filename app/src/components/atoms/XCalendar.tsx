import React from "react";
import RenderArrow from "./components/RenderArrow";
import RenderHeader from "./components/RenderHeader";
import { COLOR } from "@/styles/COLOR";
import { Calendar } from "react-native-calendars";
import { MarkedDates, MarkingTypes } from "react-native-calendars/src/types";

interface Props {
  markedDates: MarkedDates;
  onDayPress: ({ timestamp }) => void;
  minDate?: string;
  markingType?: MarkingTypes;
}

const XCalendar = (props: Props) => {
  const {
    markedDates,
    onDayPress,
    minDate = new Date().toISOString().split("T")[0],
    markingType = "period",
  } = props;
  return (
    <Calendar
      minDate={minDate}
      markingType={markingType}
      markedDates={markedDates}
      onDayPress={onDayPress}
      renderArrow={(direction: string) => <RenderArrow direction={direction} />}
      renderHeader={RenderHeader}
      //   theme={{
      //     "stylesheet.calendar.header": {
      //       arrow: {
      //         padding: 0,
      //       },
      //       header: {
      //         flexDirection: "row",
      //         backgroundColor: COLOR.WHITE,
      //         justifyContent: "space-between",
      //       },
      //     },
      //   }}
    />
  );
};

export default XCalendar;
