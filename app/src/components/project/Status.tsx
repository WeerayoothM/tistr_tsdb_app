import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "@/styles/COMMON";
import { dateDiff } from "@/utils/format";

const Status = ({ project_status = "", percent = 0, end_date = null }) => {
  const isComplete = project_status.includes("เสร็จสิ้น");
  const endDateDiff = dateDiff(end_date, new Date(), false);
  const isExceed = endDateDiff < 0;
  const _percent = percent ? percent : isComplete ? 100 : 75;
  const positionMarker = {
    top: -18,
    // left: "100%",
    left: ((SCREEN_WIDTH - 60) * _percent) / 100 - 13, // - 0.12 * _percent,
    // left: `${-1.75 + percent}%`,
  };

  const mainColor = isComplete
    ? COLOR.ORANGE
    : isExceed
    ? COLOR.PINK
    : COLOR.DARKGREEN2;
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...TEXT.caption2 }}>สถานะ</Text>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: mainColor,
            marginHorizontal: 10,
          }}
        />
        <Text style={{ ...TEXT.caption2, color: mainColor }}>
          {isComplete ? "เสร็จสิ้น" : isExceed ? "เกินเวลา" : "กำลังดำเนินการ"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          gap: 1,
          marginTop: 12,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: positionMarker.top,
            left: positionMarker.left,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            height: 25,
            width: 25,
            zIndex: 3,
          }}
        >
          <AntDesign name="caretdown" size={24} color={COLOR.WHITE} />
        </View>
        <View
          style={{
            position: "absolute",
            top: positionMarker.top,
            left: positionMarker.left,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            height: 25,
            width: 25,
            zIndex: 4,
          }}
        >
          <AntDesign name="caretdown" size={16} color={mainColor} />
        </View>
        <View
          style={{
            width: (SCREEN_WIDTH - 60) / 4,
          }}
        >
          <View
            style={{
              backgroundColor: mainColor,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              height: 9,
            }}
          />
          <Text
            style={{
              textAlign: "right",
              ...TEXT.caption2,
              color: COLOR.GRAY,
            }}
          >
            25%
          </Text>
        </View>
        <View
          style={{
            width: (SCREEN_WIDTH - 60) / 4,
          }}
        >
          <View
            style={{
              backgroundColor: mainColor,
              height: 9,
            }}
          />
          <Text
            style={{
              textAlign: "right",
              ...TEXT.caption2,
              color: COLOR.GRAY,
            }}
          >
            50%
          </Text>
        </View>
        <View
          style={{
            width: (SCREEN_WIDTH - 60) / 4,
          }}
        >
          <View
            style={{
              backgroundColor: mainColor,
              height: 9,
            }}
          />
          <Text
            style={{
              textAlign: "right",
              ...TEXT.caption2,
              color: COLOR.GRAY,
            }}
          >
            75%
          </Text>
        </View>
        <View
          style={{
            width: (SCREEN_WIDTH - 60) / 4,
          }}
        >
          <View
            style={{
              backgroundColor: mainColor,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              height: 9,
            }}
          />
          <Text
            style={{
              textAlign: "right",
              ...TEXT.caption2,
              color: COLOR.GRAY,
            }}
          >
            100%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Status;
