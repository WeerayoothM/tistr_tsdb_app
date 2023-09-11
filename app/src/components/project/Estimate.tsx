import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { VictoryPie } from "victory-native";
import { ProjectEvaData } from "@/context/ProjectContext";

const Estimate = ({
  projectEva = {} as ProjectEvaData,
}: {
  projectEva?: ProjectEvaData;
}) => {
  const percentage = projectEva?.percentage || 0;
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 27,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
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
            { x: "Dogs", y: percentage },
            { x: "Birds", y: 100 - percentage },
          ]}
          style={{
            border: { borderWidth: 1 },
            data: {
              fill: ({ datum }) =>
                datum.y > 50 ? COLOR.DARKGREEN2 : COLOR.LIGHTGRAY3,
            },
          }}
          radius={80}
          width={180}
          height={180}
          innerRadius={70}
          standalone={true}
          labelComponent={<></>}
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
          <Text style={{ ...TEXT.header2 }}>{percentage}</Text>
          {/* <Text style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}>
            ดีเยี่ยม
          </Text> */}
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
          {/* <Text style={{ ...TEXT.header5, color: COLOR.DARKGREEN2 }}>
            ผ่านเกณฑ์
          </Text> */}
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
        <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
          {projectEva?.eva_criteria || "-"}
        </Text>
        {/* <View style={{ flexBasis: "50%", gap: 8 }}>
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
        </View> */}
      </View>
    </View>
  );
};

export default Estimate;
