import React, { useEffect, useState } from "react";
import { COLOR } from "@/styles/COLOR";
import { Calendar } from "react-native-calendars";
import { MarkedDates, MarkingTypes } from "react-native-calendars/src/types";
import XModal from "./XModal";
import XSlideUp from "../animations/XSlideUp";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SCREEN_WIDTH } from "@/styles/COMMON";
import { TEXT } from "@/styles/TEXT";
import { getMonthString } from "@/utils/format";
import dayjs from "dayjs";

interface Props {
  calendarOpen: boolean;
  onClose: () => void;
  markedDates: MarkedDates;
  onDayPress: ({ timestamp }) => void;
  minDate?: string;
  markingType?: MarkingTypes;
}

const XCalendar = ({
  calendarOpen,
  onClose,
  markedDates,
  onDayPress,
  minDate = new Date().toISOString().split("T")[0],
  markingType = "period",
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customDate, setCustomDate] = useState(dayjs());
  const [yearList, setYearList] = useState([]);
  useEffect(() => {
    let y = [];
    for (let i = dayjs().year() + 10; i > dayjs().year() - 20; i--) {
      y = [...y, i];
    }
    setYearList(y);
  }, []);

  return (
    <XModal
      visible={!!calendarOpen}
      onClose={onClose}
      containerStyle={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <XSlideUp height={500} active={!!calendarOpen}>
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 500,
            backgroundColor: COLOR.WHITE,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
          }}
        >
          <Calendar
            renderHeader={() => (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <View>
                  <Text
                    style={{ ...TEXT.caption1SemiBold, color: COLOR.DARKGRAY }}
                  >
                    {getMonthString(customDate.month() + 1, "EN")}
                    {"  "}
                    {customDate.year()}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            onPressArrowLeft={() =>
              setCustomDate((prev) =>
                dayjs(prev.format("YYYY-MM-DD")).subtract(1, "month")
              )
            }
            onPressArrowRight={() =>
              setCustomDate((prev) =>
                dayjs(prev.format("YYYY-MM-DD")).add(1, "month")
              )
            }
            initialDate={customDate.format("YYYY-MM-DD")}
            allowSelectionOutOfRange
            current={customDate.format("YYYY-MM-DD").toString()}
            markingType="multi-dot"
            markedDates={markedDates}
            onDayPress={onDayPress}
          />
          {isModalVisible && yearList.length > 0 && (
            <View
              style={{
                zIndex: 99,
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: COLOR.WHITE,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{ flex: 1, alignItems: "center", paddingLeft: 50 }}
                >
                  <Text style={{ fontSize: 20 }}>Select Year</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => setIsModalVisible(false)}
                >
                  <View
                  // style={{
                  //   flex: 1,
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  // }}
                  >
                    <Text style={{ ...TEXT.body1 }}>X</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    alignItems: "center",
                    zIndex: 25,
                    padding: 15,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {yearList.map((year) => (
                    <TouchableOpacity
                      key={year}
                      onPress={() => {
                        setCustomDate((prev) =>
                          dayjs().subtract(dayjs().year() - year, "years")
                        );
                        setIsModalVisible(false);
                      }}
                      style={{
                        width: "100%",
                        backgroundColor:
                          year.toString() ===
                          customDate.format("YYYY").toString()
                            ? COLOR.LIGHTYELLOW
                            : COLOR.WHITE,
                      }}
                    >
                      <View
                        style={{
                          padding: 20,
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          {year}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </XSlideUp>
    </XModal>
  );
};

export default XCalendar;
