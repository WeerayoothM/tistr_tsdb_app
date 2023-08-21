import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { FontAwesome } from "@expo/vector-icons";
import { formatDateToThaiDate } from "@/utils/format";
import XDropdown from "@/components/atoms/XDropdown";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  BaiJamjureeRegular,
  BaiJamjureeSemiBold,
  SCREEN_WIDTH,
} from "@/styles/COMMON";
import CardLayoutThin from "@/components/layout/CardLayoutThin";
import CardLayoutThick from "@/components/layout/CardLayoutThick";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryPie,
} from "victory-native";
import CardLayoutThinVertical from "@/components/layout/CardLayoutThinVertical";
import { getChart1, getChart2 } from "./apis";
import { Chart1Data, Chart2, Chart2Data } from "@/context/DashboardContext";

const mockChart1 = {
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26276325],
      borderColor: "#1265DC",
      backgroundColor: "#1265DC",
    },
    {
      type: "bar",
      label: "งบโครงการภายใน (ผล)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26276325],
      borderColor: "#FF7A00",
      backgroundColor: "#FF7A00",
    },
  ],
};

const mockChart2 = {
  labels: [
    "กำลังดำเนินการ",
    "เสร็จสิ้นโครงการ",
    "เกินระยะเวลาโครงการ",
    "รออนุมัติโครงการ",
  ],
  datasets: [
    {
      label: "จำนวนโครงการ",
      data: [300, 50, 100, 200],
      backgroundColor: ["#008F88", "#EF9B00", "#E9748C", "#EDF1FF"],
    },
  ],
};

export default function TabDashboardScreen() {
  const [selectYear, setSelectYear] = useState("");
  const [selectBudget, setSelectBudget] = useState("");
  const [endAngle, setEndAngle] = useState(0);
  const [width, setWidth] = useState(null);
  const [chart1, setChart1] = useState<Chart1Data>(mockChart1);
  const [chart2, setChart2] = useState<Chart2Data>(null);

  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;

    setWidth(width);
  };

  useEffect(() => {
    setTimeout(() => {
      setEndAngle(360);
    }, 500);
  }, []);

  const fetchChart1 = async () => {
    const payload = {
      source: "IN",
      year: "2018",
    };
    try {
      const resp = await getChart1(payload);
      console.log(resp.data.data);

      setChart1(() => resp.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchChart2 = async () => {
    const payload = {
      source: "IN",
      year: "2018",
    };
    try {
      const resp = await getChart2(payload);
      console.log(resp.data.data);

      setChart2(() => resp.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      // await Promise.all([fetchChart1(), fetchChart2()]);
      await fetchChart1();
      await fetchChart2();
    })();
  }, []);

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: COLOR.OFFWHITE }}>
          <ImageBackground
            source={require("../../../assets/images/header_bg.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: 250,
              zIndex: 1,
            }}
            resizeMode="cover"
          />
          <LinearGradient
            // Background Linear Gradient
            pointerEvents="none"
            colors={[COLOR.TRANSPARENT, COLOR.OFFWHITE]}
            locations={[0, 1]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 150,
              height: 100,
              width: "100%",
              zIndex: 2,
            }}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingVertical: 40,
              zIndex: 3,
              backgroundColor: COLOR.TRANSPARENT,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: COLOR.TRANSPARENT,
              }}
            >
              <Text style={{ ...TEXT.header1BOLD, color: COLOR.WHITE }}>
                แดชบอร์ด
              </Text>

              <TouchableOpacity
                onPress={() => router.push("dashboard/notification")}
              >
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: COLOR.PINK,
                    borderRadius: 50,
                    width: 13,
                    height: 13,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 3,
                    right: 0,
                    top: -5,
                  }}
                >
                  <Text
                    style={{
                      ...TEXT.badge1,
                      color: COLOR.WHITE,
                      fontSize: 8,
                    }}
                  >
                    2
                  </Text>
                </View>
                <FontAwesome name="bell" size={24} color={COLOR.WHITE} />
              </TouchableOpacity>
              {/* </Link> */}
            </View>
            <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
              วัน{formatDateToThaiDate()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <XDropdown
                labelText=""
                defaultValue={`${Number(new Date().getFullYear()) + 543}`}
                onValueChange={(value) => {
                  setSelectYear(value);
                }}
                options={[
                  {
                    label: "พ.ศ. 2566",
                    value: "2566",
                  },
                  {
                    label: "พ.ศ. 2565",
                    value: "2565",
                  },
                ]}
                dropDownContainerStyle={{ width: 130, alignSelf: "flex-end" }}
                zIndex={999}
              />
            </View>
            <View
              style={{
                flex: 1,
                // flexGrow: 1,
                backgroundColor: COLOR.TRANSPARENT,
                marginTop: 20,
                zIndex: 0,
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../../../assets/images/card_orange_bg.png")}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    // borderRadius: 10,
                  }}
                  imageStyle={{ borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    zIndex: 3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    width: "100%",
                    minHeight: 116,
                  }}
                >
                  <View
                    style={{
                      flexGrow: 1,
                      justifyContent: "center",
                      paddingVertical: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Text style={{ ...TEXT.body2BOLD, color: COLOR.WHITE }}>
                        โครงการทั้งหมด
                      </Text>
                      <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                        ปี {"2565"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/project_icon_orange.png")}
                        style={{ height: 38, resizeMode: "contain" }}
                        // resizeMode="cover"
                      />
                      <Text
                        style={{
                          ...TEXT.header1SemiBOLD,
                          fontFamily: BaiJamjureeSemiBold,
                          fontSize: 40,
                          lineHeight: 40,
                          color: COLOR.WHITE,
                        }}
                      >
                        {"2,370"}
                      </Text>
                      <Text style={{ ...TEXT.body1, color: COLOR.WHITE }}>
                        โครงการ
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 13, marginTop: 14 }}>
                <TouchableOpacity style={{ flex: 1 }}>
                  <CardLayoutThin
                    themeColor={COLOR.BLUE}
                    containerStyle={{
                      paddingHorizontal: 17,
                      paddingVertical: 11,
                    }}
                  >
                    <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
                      โครงการนอกงบประมาณ
                    </Text>
                    <Text
                      style={{
                        ...TEXT.caption1SemiBold,
                        fontSize: 40,
                        color: COLOR.BLUE,
                      }}
                    >
                      {"723"}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}
                      >
                        โครงการ
                      </Text>
                      <Image
                        source={require("../../../assets/images/arrow-down-circle-blue.png")}
                      />
                    </View>
                  </CardLayoutThin>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                  <CardLayoutThin
                    themeColor={COLOR.PURPLE}
                    containerStyle={{
                      paddingHorizontal: 17,
                      paddingVertical: 11,
                    }}
                  >
                    <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
                      โครงการในงบประมาณ
                    </Text>
                    <Text
                      style={{
                        ...TEXT.caption1SemiBold,
                        fontSize: 40,
                        color: COLOR.PURPLE,
                      }}
                    >
                      {"1,264"}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}
                      >
                        โครงการ
                      </Text>
                      <Image
                        source={require("../../../assets/images/arrow-down-circle-purple.png")}
                      />
                    </View>
                  </CardLayoutThin>
                </TouchableOpacity>
              </View>

              {chart2 ? (
                <CardLayoutThick
                  leftHeader={"สถานะโครงการรวมทั้งหมด"}
                  rightHeader={""}
                  themeColor={COLOR.DARKORANGE}
                  onlyHeader={false}
                  headerHeight={50}
                  headerContainerStyle={{ marginTop: 37 }}
                  containerStyle={{ padding: 18 }}
                  headerLabelStyle={{ paddingHorizontal: 20 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                        flexGrow: 1,
                      }}
                    >
                      <VictoryPie
                        data={[
                          {
                            x: chart2.labels[0],
                            y:
                              chart2.datasets[0].data[0] /
                              chart2.datasets[0].data.reduce(
                                (a, b) => a + b,
                                0
                              ),
                          },
                          {
                            x: chart2.labels[1],
                            y:
                              chart2.datasets[0].data[1] /
                              chart2.datasets[0].data.reduce(
                                (a, b) => a + b,
                                0
                              ),
                          },
                          {
                            x: chart2.labels[2],
                            y:
                              chart2.datasets[0].data[2] /
                              chart2.datasets[0].data.reduce(
                                (a, b) => a + b,
                                0
                              ),
                          },
                          {
                            x: chart2.labels[3],
                            y:
                              chart2.datasets[0].data[3] /
                              chart2.datasets[0].data.reduce(
                                (a, b) => a + b,
                                0
                              ),
                          },
                        ]}
                        animate={{
                          duration: 1000, // Duration in milliseconds
                          // onLoad: { duration: 500 },
                        }}
                        endAngle={endAngle}
                        style={{
                          data: {
                            fill: ({ datum }) => {
                              switch (datum.xName) {
                                case chart2.labels[0]:
                                  return chart2.datasets[0].backgroundColor[0];
                                case chart2.labels[1]:
                                  return chart2.datasets[0].backgroundColor[1];
                                case chart2.labels[2]:
                                  return chart2.datasets[0].backgroundColor[2];
                                case chart2.labels[3]:
                                  return chart2.datasets[0].backgroundColor[3];
                                default:
                                  return COLOR.LIGHTGRAY2;
                              }
                            },
                          },
                        }}
                        // SCREEN_WIDTH -
                        width={SCREEN_WIDTH - width - 40 - 36 - 8}
                        height={SCREEN_WIDTH - width - 40 - 36 - 8}
                        padding={0}
                        innerRadius={
                          ((SCREEN_WIDTH - width - 40 - 36 - 8) * 0.75) / 2
                        }
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
                        <Text
                          style={{
                            ...TEXT.header5SemiBOLD,
                            color: COLOR.DARKORANGE,
                          }}
                        >
                          {chart2.datasets[0].data.reduce((a, b) => a + b, 0)}
                        </Text>
                        <Text
                          style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}
                        >
                          โครงการ
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        gap: 13,
                      }}
                      onLayout={handleLayout}
                    >
                      <View>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
                            color: chart2.datasets[0].backgroundColor[0],
                          }}
                        >
                          {chart2.datasets[0].data[0]}
                        </Text>
                        <Text
                          style={{
                            ...TEXT.label2Thin,
                            color: chart2.datasets[0].backgroundColor[0],
                          }}
                        >
                          {chart2.labels[0]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
                            color: chart2.datasets[0].backgroundColor[1],
                          }}
                        >
                          {chart2.datasets[0].data[1]}
                        </Text>
                        <Text
                          style={{
                            ...TEXT.label2Thin,
                            color: chart2.datasets[0].backgroundColor[1],
                          }}
                        >
                          {chart2.labels[1]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
                            color: chart2.datasets[0].backgroundColor[2],
                          }}
                        >
                          {chart2.datasets[0].data[2]}
                        </Text>
                        <Text
                          style={{
                            ...TEXT.label2Thin,
                            color: chart2.datasets[0].backgroundColor[2],
                          }}
                        >
                          {chart2.labels[2]}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
                            color: chart2.datasets[0].backgroundColor[3],
                          }}
                        >
                          {chart2.datasets[0].data[3]}
                        </Text>
                        <Text
                          style={{
                            ...TEXT.label2Thin,
                            color: chart2.datasets[0].backgroundColor[3],
                          }}
                        >
                          {chart2.labels[3]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </CardLayoutThick>
              ) : (
                <></>
              )}

              <CardLayoutThick
                leftHeader={"การเบิกจ่ายงบประมาณรวมทั้งหมด"}
                rightHeader={"ปี 2565"}
                themeColor={COLOR.DARKORANGE}
                onlyHeader={false}
                headerHeight={50}
                containerStyle={{ padding: 18, gap: 7 }}
                headerContainerStyle={{ marginTop: 22 }}
                headerLabelStyle={{ paddingHorizontal: 20 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
                    งบประมาณรวม
                  </Text>
                  <Text
                    style={{
                      ...TEXT.body2,
                      color: COLOR.DARKORANGE,
                      flexGrow: 1,
                      alignSelf: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    40,000,000
                  </Text>
                  <Text style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}>
                    บาท
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
                    ค่าใช้จ่ายรวม
                  </Text>
                  <Text
                    style={{
                      ...TEXT.body2,
                      color: COLOR.ORANGE,
                      flexGrow: 1,
                      alignSelf: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    36,488,960
                  </Text>
                  <Text style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}>
                    บาท
                  </Text>
                </View>
              </CardLayoutThick>

              {chart1 ? (
                <View
                  style={{
                    backgroundColor: COLOR.WHITE,
                    borderRadius: 10,
                    marginTop: 22,
                    padding: 18,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 13,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        ...TEXT.caption2,
                        color: COLOR.DARKGRAY,
                        flexWrap: "wrap",
                      }}
                    >
                      รายการเบิกจ่ายงบประมาณ
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        minWidth: 90,
                      }}
                    >
                      <XDropdown
                        labelText=""
                        defaultValue={`งบรวม`}
                        onValueChange={(value) => {
                          setSelectBudget(value);
                        }}
                        options={[
                          {
                            label: "งบรวม",
                            value: "งบรวม",
                          },
                          {
                            label: "ค่าใช้จ่ายรวม",
                            value: "ค่าใช้จ่ายรวม",
                          },
                        ]}
                        dropDownContainerStyle={{
                          flex: 1,
                          alignSelf: "flex-end",
                        }}
                        zIndex={999}
                        containerStyle={{
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: COLOR.LIGHTGRAY,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 11,
                        flex: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {chart1.datasets.map((chart) => (
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
                      <View style={{ flexGrow: 1 }}>
                        <Text
                          style={{
                            ...TEXT.label3Thin,
                            color: COLOR.LIGHTGRAY,
                            textAlign: "right",
                          }}
                        >
                          ปี 2565
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <VictoryChart
                        padding={20}
                        width={SCREEN_WIDTH - 40 - 36}
                        height={123}
                        domainPadding={0}
                      >
                        <VictoryGroup
                          offset={8}
                          style={{ data: { width: 8 } }}
                          animate={{
                            duration: 1000,
                            onLoad: { duration: 500 },
                          }}
                        >
                          {chart1.datasets.map((chart) => (
                            <VictoryBar
                              key={"chart1 VictoryBar" + chart.label}
                              data={Array(12)
                                .fill(0)
                                .map((_, index) => ({
                                  x: chart1.labels[index],
                                  y: chart.data[index],
                                }))}
                              style={{ data: { fill: chart.backgroundColor } }}
                              cornerRadius={{ topLeft: 1, topRight: 1 }}
                            />
                          ))}
                        </VictoryGroup>

                        {/* Average Line */}
                        <VictoryLine
                          // data={[
                          //   { x: "ม.ค.", y: 50 },
                          //   { x: "ก.พ.", y: 90 },
                          //   { x: "มี.ค.", y: 100 },
                          //   { x: "เม.ย.", y: 70 },
                          //   { x: "พ.ค.", y: 75 },
                          //   { x: "มิ.ย.", y: 70 },
                          //   { x: "ก.ค.", y: 50 },
                          //   { x: "ส.ค.", y: 60 },
                          //   { x: "ก.ย.", y: 50 },
                          //   { x: "ต.ค.", y: 60 },
                          //   { x: "พ.ย.", y: 80 },
                          //   { x: "ธ.ค.", y: 80 },
                          // ]}
                          data={Array(12)
                            .fill(0)
                            .map((_, index) => ({
                              x: chart1.labels[index],
                              y:
                                chart1.datasets.reduce(
                                  (a, b) => a + b.data[index],
                                  0
                                ) / chart1.datasets.length,
                            }))}
                          style={{
                            data: { stroke: COLOR.DARKBLUE, strokeWidth: 2 },
                          }}
                          animate={{
                            duration: 1000,
                          }}
                        />

                        {/* Horizontal Line at Top of Chart */}
                        <VictoryLine
                          data={[
                            {
                              x: "ม.ค.",
                              y: Math.max(
                                ...chart1.datasets.reduce(
                                  (acc, item) => [...acc, ...item.data],
                                  []
                                )
                              ),
                            },
                            {
                              x: "ธ.ค.",
                              y: Math.max(
                                ...chart1.datasets.reduce(
                                  (acc, item) => [...acc, ...item.data],
                                  []
                                )
                              ),
                            },
                          ]}
                          style={{
                            data: { stroke: COLOR.DARKGRAY2, strokeWidth: 1 },
                          }}
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
                        />
                      </VictoryChart>
                    </View>
                  </View>
                </View>
              ) : (
                <></>
              )}

              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../../../assets/images/card_darkorange_bg.png")}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    // borderRadius: 10,
                  }}
                  imageStyle={{ borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    zIndex: 3,
                    paddingHorizontal: 20,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexGrow: 1,
                      justifyContent: "center",
                      paddingVertical: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{ ...TEXT.caption1BOLD, color: COLOR.WHITE }}
                      >
                        ผลการประเมินโครงการรวมทั้งหมด
                      </Text>
                    </View>
                    <View style={{ gap: 11 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 11,
                        }}
                      >
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          ผ่านเกณฑ์
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body2BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            alignSelf: "flex-end",
                            textAlign: "right",
                          }}
                        >
                          682
                        </Text>
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          โครงการ
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 11,
                        }}
                      >
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          ไม่ผ่านเกณฑ์
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body2BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            alignSelf: "flex-end",
                            textAlign: "right",
                          }}
                        >
                          46
                        </Text>
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          โครงการ
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 11,
                        }}
                      >
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          ยังไม่เสร็จสิ้นโครงการ
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body2BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            alignSelf: "flex-end",
                            textAlign: "right",
                          }}
                        >
                          225
                        </Text>
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          โครงการ
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../../../assets/images/card_orange_bg.png")}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    // borderRadius: 10,
                  }}
                  imageStyle={{ borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    zIndex: 3,
                    paddingHorizontal: 20,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexGrow: 1,
                      justifyContent: "center",
                      paddingVertical: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Text
                        style={{ ...TEXT.caption1BOLD, color: COLOR.WHITE }}
                      >
                        ระยะเวลาดำเนินโครงการที่เสร็จสิ้น
                      </Text>
                    </View>
                    <View style={{ gap: 11 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 11,
                        }}
                      >
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          เสร็จสิ้นตามระยะเวลาโครงการ
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body2BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            textAlign: "right",
                          }}
                        >
                          512
                        </Text>
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          โครงการ
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 11,
                        }}
                      >
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          เกินระยะเวลาโครงการ
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body2BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            textAlign: "right",
                          }}
                        >
                          119
                        </Text>
                        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                          โครงการ
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <CardLayoutThick
                leftHeader={"ผลผลิต / ผลลัพธ์โครงการรวมทั้งหมด"}
                rightHeader={""}
                themeColor={COLOR.ORANGE}
                onlyHeader={true}
                headerContainerStyle={{ marginTop: 22 }}
                headerLabelStyle={{ paddingHorizontal: 20 }}
              />

              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../../../assets/images/card_orange_bg.png")}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    // borderRadius: 10,
                  }}
                  imageStyle={{ borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    zIndex: 3,
                    paddingHorizontal: 20,
                    paddingVertical: 11,
                    width: "100%",
                  }}
                >
                  <Text style={{ ...TEXT.caption1BOLD, color: COLOR.WHITE }}>
                    จำนวนผลผลิตรวม
                  </Text>
                  <Text
                    style={{
                      ...TEXT.header1BOLD,
                      fontSize: 50,
                      color: COLOR.WHITE,
                    }}
                  >
                    278
                  </Text>
                  <Text style={{ ...TEXT.label2Thin, color: COLOR.WHITE }}>
                    ผลผลิต
                  </Text>
                </View>
              </View>

              {/* PUBLICATION */}
              <View
                style={{
                  backgroundColor: COLOR.WHITE,
                  borderRadius: 10,
                  marginTop: 10,
                  padding: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...TEXT.caption1, color: COLOR.LIGHTGRAY }}>
                    PUBLICATION
                  </Text>
                  <Text style={{ ...TEXT.header2BOLD, color: COLOR.LIGHTGRAY }}>
                    203
                  </Text>
                </View>
              </View>

              {/* IP */}

              <View
                style={{
                  backgroundColor: COLOR.WHITE,
                  borderRadius: 10,
                  marginTop: 10,
                  padding: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...TEXT.caption1, color: COLOR.LIGHTGRAY }}>
                    IP
                  </Text>
                  <Text style={{ ...TEXT.header2BOLD, color: COLOR.LIGHTGRAY }}>
                    75
                  </Text>
                </View>
              </View>

              {/* สัญญาโครงการทั้งหมด */}
              <CardLayoutThick
                leftHeader={"สัญญาโครงการทั้งหมด"}
                rightHeader={""}
                themeColor={COLOR.GREEN}
                onlyHeader={true}
                headerContainerStyle={{ marginTop: 10 }}
                headerLabelStyle={{ paddingHorizontal: 20 }}
              />

              {/* สัญญาบริษัทรวม */}
              <CardLayoutThinVertical
                themeColor={COLOR.BLUE}
                containerStyle={{
                  paddingHorizontal: 27,
                  paddingVertical: 12,
                }}
                headerContainerStyle={{ marginTop: 10 }}
              >
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  สัญญาบริษัทรวม
                </Text>
                <Text
                  style={{
                    ...TEXT.body1SemiBold,
                    color: COLOR.DARKGREEN2,
                  }}
                >
                  {"230"}
                </Text>
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  สัญญา
                </Text>
              </CardLayoutThinVertical>

              {/* เงินทุนบริษัทรวม */}
              <CardLayoutThinVertical
                themeColor={COLOR.BLUE}
                containerStyle={{
                  paddingHorizontal: 27,
                  paddingVertical: 12,
                }}
                headerContainerStyle={{ marginTop: 10 }}
              >
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  เงินทุนบริษัทรวม
                </Text>
                <Text
                  style={{
                    ...TEXT.body1SemiBold,
                    color: COLOR.DARKGREEN2,
                  }}
                >
                  {"15,000,000"}
                </Text>
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  บาท
                </Text>
              </CardLayoutThinVertical>

              {/* จำนวนทุนรวม */}
              <CardLayoutThinVertical
                themeColor={COLOR.PURPLE}
                containerStyle={{
                  paddingHorizontal: 27,
                  paddingVertical: 12,
                }}
                headerContainerStyle={{ marginTop: 10 }}
              >
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  จำนวนทุนรวม
                </Text>
                <Text
                  style={{
                    ...TEXT.body1SemiBold,
                    color: COLOR.DARKGREEN2,
                  }}
                >
                  {"824"}
                </Text>
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  สัญญา
                </Text>
              </CardLayoutThinVertical>

              {/* เงินทุนรวม */}
              <CardLayoutThinVertical
                themeColor={COLOR.PURPLE}
                containerStyle={{
                  paddingHorizontal: 27,
                  paddingVertical: 12,
                }}
                headerContainerStyle={{ marginTop: 10 }}
              >
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  เงินทุนรวม
                </Text>
                <Text
                  style={{
                    ...TEXT.body1SemiBold,
                    color: COLOR.DARKGREEN2,
                  }}
                >
                  {"25,000,000"}
                </Text>
                <Text style={{ ...TEXT.label1Thin, color: COLOR.DARKGRAY }}>
                  บาท
                </Text>
              </CardLayoutThinVertical>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
