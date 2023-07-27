import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";

const Status = ({ percent = 0, end_date = null }) => {
  const positionMarker = {
    top: -15,
    left: `${-1.75 + percent}%`,
  };
  const isPassed = new Date(end_date).getTime() > new Date().getTime();

  const mainColor = isPassed
    ? COLOR.PINK
    : percent === 100
    ? COLOR.ORANGE
    : COLOR.DARKGRAY2;
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
          {percent === 100 ? "เสร็จสิ้น" : "กำลังดำเนินการ"}
        </Text>
      </View>
      <View style={{ flexDirection: "row", flex: 1, gap: 3, marginTop: 12 }}>
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
            flexGrow: 1,
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
            flexGrow: 1,
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
            flexGrow: 1,
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
            flexGrow: 1,
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