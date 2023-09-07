import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
} from "victory-native";
import { SCREEN_WIDTH } from "@/styles/COMMON";

const chartData = {
  labels: ["มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค."],
  datasets: [
    {
      type: "bar",
      label: "งบโครงการภายใน (แผน)",
      data: [30000, 0, 50000, 50000, 0],
      borderColor: "#1265DC",
      backgroundColor: "#1265DC",
    },
    {
      type: "bar",
      label: "งบโครงการภายใน (ผล)",
      data: [28000, 0, 4000, 50000, 0],
      borderColor: "#FF7A00",
      backgroundColor: "#FF7A00",
    },
  ],
};

const chartData2 = {
  labels: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ],
  datasets: [
    {
      type: "bar",
      label: "งบโครงการภายใน (แผน)",
      data: [100000000, 0, 0, 0, 0, 0, 25000000, 0, 0, 0, 0, 26276325],
      borderColor: "#1265DC",
      backgroundColor: "#1265DC",
    },
    {
      type: "bar",
      label: "งบโครงการภายใน (ผล)",
      data: [30000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26276325],
      borderColor: "#FF7A00",
      backgroundColor: "#FF7A00",
    },
  ],
};

const Summary = ({ project }) => {
  const lengthMaxData = Math.max(
    ...chartData.datasets.reduce((acc, item) => [...acc, ...item.data], [])
  ).toString().length;

  return (
    <View
      style={{
        paddingVertical: 27,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
      <Text style={{ ...TEXT.caption1SemiBold, textAlign: "center" }}>
        รายงานการเบิกจ่ายงบประมาณตลอดโครงการ
      </Text>
      <View style={{ marginTop: 10, paddingHorizontal: 10, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 11,
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {chartData.datasets.map((chart) => (
            <View
              key={"chart1 Label" + chart.label}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: chart.backgroundColor,
                }}
              />
              <Text
                style={{
                  ...TEXT.label3Thin,
                  color: COLOR.DARKGRAY,
                }}
              >
                {chart.label}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...TEXT.label3Thin,
              color: COLOR.DARKGRAY,
            }}
          >
            เดือน {chartData.labels[0]}
            {" - "}เดือน {chartData.labels[chartData.labels.length - 1]}
          </Text>
        </View>
      </View>
      <View
        style={{
          // alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <VictoryChart
          padding={{
            left: 25 + lengthMaxData * 2.5,
            right: 20,
            bottom: 30,
            top: 30,
          }}
          // padding={50}
          width={SCREEN_WIDTH - 40}
          domainPadding={{
            x: [
              lengthMaxData * 3,
              // Math.max(
              //   ...chartData.datasets.reduce(
              //     (acc, item) => [...acc, ...item.data],
              //     []
              //   )
              // ),
              0,
            ],
          }}
          // width={600}
          height={(SCREEN_WIDTH - 40) * 0.5}
          containerComponent={<VictoryContainer responsive={true} />}
        >
          {/* Y-Axis */}
          <VictoryAxis
            // width={10000}
            // height={10}
            dependentAxis={true}
            style={{
              grid: { stroke: COLOR.LIGHTGRAY2 },
              tickLabels: {
                fontSize: 10,
              },
              axis: { stroke: "transparent" },
            }}
            // tickFormat={() => ""}
            tickLabelComponent={
              <VictoryLabel
                verticalAnchor="middle"
                textAnchor="middle"
                dy={-6}
                style={{
                  stroke: COLOR.DARKGRAY2,
                  ...TEXT.label3Thin,
                  fontSize: 9,
                  fontWeight: 100,
                }}
                dx={Math.min(5 - lengthMaxData, 0)}
                // x={100}
              />
            }
          />
          {/* X-Axis */}
          <VictoryAxis
            style={{
              axis: { stroke: COLOR.DARKGRAY2 },
              axisLabel: {},
              ticks: {},
              tickLabels: {
                fill: COLOR.DARKGRAY,
                fontSize: 10,
              },
            }}
            // dependentAxis={true}
          />
          <VictoryGroup
            // width={100}
            offset={8}
            style={{ data: { width: 8 } }}
            animate={{
              duration: 1000,
              onLoad: { duration: 500 },
            }}
            // padding={20}
          >
            {chartData.datasets.map((chart) => (
              <VictoryBar
                key={"chartData VictoryBar" + chart.label}
                data={Array(chartData.labels.length)
                  .fill(0)
                  .map((_, index) => ({
                    x: chartData.labels[index],
                    y: chart.data[index],
                  }))}
                style={{ data: { fill: chart.backgroundColor } }}
                cornerRadius={{ topLeft: 1, topRight: 1 }}
              />
            ))}
          </VictoryGroup>

          {/* Average Line */}
          <VictoryLine
            data={Array(chartData.labels.length)
              .fill(0)
              .map((_, index) => ({
                x: chartData.labels[index],
                y:
                  chartData.datasets.reduce((a, b) => a + b.data[index], 0) /
                  chartData.datasets.length,
              }))}
            style={{
              data: { stroke: COLOR.DARKBLUE, strokeWidth: 2 },
            }}
            animate={{
              duration: 1000,
            }}
          />

          {/* Horizontal Line at Top of Chart */}
          {/* <VictoryLine
            data={[
              {
                x: chartData.labels[0],
                y: Math.max(
                  ...chartData.datasets.reduce(
                    (acc, item) => [...acc, ...item.data],
                    []
                  )
                ),
              },
              {
                x: chartData.labels[chartData.labels.length - 1],
                y: Math.max(
                  ...chartData.datasets.reduce(
                    (acc, item) => [...acc, ...item.data],
                    []
                  )
                ),
              },
            ]}
            style={{
              data: { stroke: COLOR.DARKGRAY2, strokeWidth: 1 },
            }}
          /> */}
        </VictoryChart>
      </View>
    </View>
  );
};

export default Summary;
