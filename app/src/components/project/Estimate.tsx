import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { VictoryPie } from "victory-native";

const Estimate = ({ end_date = "" }) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingBottom: 27,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
      {/* <svg width={300} height={300}> */}
      {/* <circle cx={150} cy={150} r={50} fill="#c43a31" /> */}
      <View
        style={{
          width: 180,
          height: 180,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <VictoryPie
          data={[
            { x: "Dogs", y: 85 },
            { x: "Birds", y: 15 },
          ]}
          style={{
            border: { borderWidth: 1 },
            data: {
              fill: ({ datum }) =>
                datum.y > 50 ? COLOR.DARKGREEN2 : COLOR.LIGHTGRAY3,
            },

            labels: {
              opacity: 0,
            },
          }}
          width={500}
          height={500}
          innerRadius={170}
          standalone={true}
        />
        <View
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...TEXT.header2 }}>85</Text>
          <Text style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}>
            ดีเยี่ยม
          </Text>
        </View>
      </View>
      {/* </svg> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Text style={{ ...TEXT.caption1SemiBold, color: COLOR.DARKGRAY }}>
            เกณฑ์การประเมิน
          </Text>
        </View>
        <View style={{ flexGrow: 1, alignItems: "center" }}>
          <Text style={{ ...TEXT.header5, color: COLOR.DARKGREEN2 }}>
            ผ่านเกณฑ์
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: COLOR.LIGHTGRAY2,
          marginVertical: 10,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexBasis: "50%", gap: 8 }}>
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
            เกณฑ์การประเมิน (1)
          </Text>
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
            เกณฑ์การประเมิน (2)
          </Text>
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
            เกณฑ์การประเมิน (3)
          </Text>
        </View>
        <View style={{ flexBasis: "50%", gap: 8, alignItems: "center" }}>
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>80</Text>
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>76</Text>
          <Text
            style={{
              ...TEXT.caption1,
              color: COLOR.DARKGRAY,
            }}
          >
            98
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Estimate;
