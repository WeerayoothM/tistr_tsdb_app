import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CardLayoutThick from "../layout/CardLayoutThick";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { formatDateToThaiDate } from "@/utils/format";

const EventIcon = ({ event, lineStyle, lastIndex }) => {
  const isComplete = event.plan_status === "Y";
  const now = new Date();
  const start = new Date(event.start_date);
  const end = new Date(event.end_date);
  const isCurrent =
    now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
  return (
    <View
      style={[
        {
          alignItems: "center",
          alignSelf: "stretch",
          paddingHorizontal: 14,
          marginHorizontal: 12,
        },
      ]}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: isCurrent
            ? COLOR.BLUE
            : isComplete
            ? COLOR.BLUE
            : COLOR.LIGHTGRAY,
          backgroundColor: isCurrent
            ? COLOR.WHITE
            : isComplete
            ? COLOR.BLUE
            : COLOR.WHITE,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="checkmark" size={14} color={COLOR.WHITE} />
      </View>
      {lastIndex ? (
        <></>
      ) : (
        <View
          style={[
            {
              flex: 1,
              width: 2,
              backgroundColor: isComplete ? COLOR.BLUE : COLOR.LIGHTGRAY,
              alig: "center",
            },
            lineStyle,
          ]}
        />
      )}
    </View>
  );
};

const Event = ({ event, style }) => {
  const { plan_name = "", end_date } = event;
  return (
    <View
      style={[
        {
          flexBasis: "55%",
          alignItems: "flex-start",
          backgroundColor: COLOR.WHITE,
          // padding: 16,
          marginBottom: 40,
        },
        style,
      ]}
    >
      <Text style={{ ...TEXT.caption1, color: COLOR.BLUE }}>
        {formatDateToThaiDate(new Date(end_date))}
      </Text>
      <Text style={{ ...TEXT.caption1SemiBold, color: COLOR.DARKGRAY }}>
        {plan_name}
      </Text>
    </View>
  );
};

const Row = ({
  event,
  eventStyle,
  lastIndex,
  iconContainerStyle,
  lineStyle,
  contentContainerStyle,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "flex-start",
          // paddingVertical
        },
        eventStyle,
      ]}
    >
      <EventIcon event={event} lineStyle={lineStyle} lastIndex={lastIndex} />
      <Event style={[contentContainerStyle]} event={event} />
    </View>
  );
};

const Timeline = ({
  projectPlan = [],
  data = [], // The actual event's array, array of objects, each object represents a single event
  eventStyle = {}, // Each event's whole row's style
  iconContainerStyle = {}, // The style object of the container that holds the icon
  lineStyle = {}, // The vertical line's style object
  contentContainerStyle = {}, // The style object of the container that holds the content i.e. title and description
}) => {
  return (
    <CardLayoutThick
      leftHeader={"รายงานแผนการดำเนินงาน"}
      rightHeader={""}
      themeColor={COLOR.BLUE}
      isCollapsible={false}
    >
      <View style={{ paddingVertical: 20 }}>
        {projectPlan.map((item, idx) => (
          <Row
            key={idx}
            event={item}
            eventStyle={eventStyle}
            lastIndex={idx === projectPlan.length - 1}
            iconContainerStyle={iconContainerStyle}
            lineStyle={lineStyle}
            contentContainerStyle={contentContainerStyle}
          />
        ))}
      </View>
    </CardLayoutThick>
  );
};

export default Timeline;
