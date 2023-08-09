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
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { BaiJamjureeSemiBold } from "@/styles/COMMON";
import CardLayoutThin from "@/components/layout/CardLayoutThin";
import CardLayoutThick from "@/components/layout/CardLayoutThick";
import { VictoryPie } from "victory-native";
import CardLayoutThinVertical from "@/components/layout/CardLayoutThinVertical";

export default function TabDashboardScreen() {
  const [selectYear, setSelectYear] = useState("");
  const [selectBudget, setSelectBudget] = useState("");
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
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
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
                dropDownContainerStyle={{ alignSelf: "flex-end" }}
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
                    height: "100%",
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
                        alignItems: "flex-end",
                        gap: 14,
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/project_icon_orange.png")}
                        style={{ height: 38, resizeMode: "cover" }}
                        // resizeMode="cover"
                      />
                      <Text
                        style={{
                          ...TEXT.header1SemiBOLD,
                          fontFamily: BaiJamjureeSemiBold,
                          fontSize: 40,
                          // fontWeight:600,
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
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <VictoryPie
                      data={[
                        { x: "inprogress", y: 1373 / 2370 },
                        { x: "done", y: 242 / 2370 },
                        { x: "overdue", y: 100 / 2370 },
                        { x: "waiting", y: 700 / 2370 },
                      ]}
                      style={{
                        border: { borderWidth: 1 },
                        data: {
                          fill: ({ datum }) => {
                            switch (datum.xName) {
                              case "inprogress":
                                return COLOR.DARKGREEN2;
                              case "waiting":
                                return COLOR.LIGHTGRAY3;
                              case "overdue":
                                return COLOR.PINK2;
                              case "done":
                                return COLOR.ORANGE;
                              default:
                                return COLOR.LIGHTGRAY2;
                            }
                          },
                          // datum.y > 50 ? COLOR.DARKGREEN2 : COLOR.LIGHTGRAY3,
                        },
                      }}
                      radius={100}
                      width={200}
                      height={200}
                      innerRadius={66}
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
                          ...TEXT.header1SemiBOLD,
                          fontSize: 40,
                          color: COLOR.DARKORANGE,
                        }}
                      >
                        2,370
                      </Text>
                      <Text
                        style={{ ...TEXT.caption2, color: COLOR.LIGHTGRAY }}
                      >
                        โครงการ
                      </Text>
                    </View>
                  </View>
                  <View style={{ gap: 13 }}>
                    <View>
                      <Text
                        style={{ ...TEXT.body1BOLD, color: COLOR.DARKGREEN2 }}
                      >
                        1,373
                      </Text>
                      <Text
                        style={{ ...TEXT.label2Thin, color: COLOR.DARKGREEN2 }}
                      >
                        รอดำเนินการ
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{ ...TEXT.body1BOLD, color: COLOR.LIGHTGRAY }}
                      >
                        362
                      </Text>
                      <Text
                        style={{ ...TEXT.label2Thin, color: COLOR.LIGHTGRAY }}
                      >
                        รออนุมัติโครงการ
                      </Text>
                    </View>
                    <View>
                      <Text style={{ ...TEXT.body1BOLD, color: COLOR.PINK2 }}>
                        13
                      </Text>
                      <Text style={{ ...TEXT.label2Thin, color: COLOR.PINK2 }}>
                        เกินระยะเวลาโครงการ
                      </Text>
                    </View>
                    <View>
                      <Text style={{ ...TEXT.body1BOLD, color: COLOR.ORANGE }}>
                        241
                      </Text>
                      <Text style={{ ...TEXT.label2Thin, color: COLOR.ORANGE }}>
                        เสร็จสิ้นโครงการ
                      </Text>
                    </View>
                  </View>
                </View>
              </CardLayoutThick>

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
                  <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                    งบประมาณรวม
                  </Text>
                  <Text
                    style={{
                      ...TEXT.body1,
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
                  <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                    ค่าใช้จ่ายรวม
                  </Text>
                  <Text
                    style={{
                      ...TEXT.body1,
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
                  }}
                >
                  <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                    รายการเบิกจ่ายงบประมาณ
                  </Text>
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
                        label: "งบโครงการภายใน",
                        value: "งบโครงการภายใน",
                      },
                      {
                        label: "งบโครงการภายนอก",
                        value: "งบโครงการภายนอก",
                      },
                    ]}
                    dropDownContainerStyle={{
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
                <View style={{ marginTop: 10 }}>
                  <Image
                    source={require("../../../assets/images/Mock_Graph_Blue.png")}
                    style={{
                      width: "100%",
                      resizeMode: "contain",
                      aspectRatio: 1,
                    }}
                  />
                </View>
              </View>

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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    width: "100%",
                    height: "100%",
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
                        <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
                          ผ่านเกณฑ์
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
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
                        <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
                          ไม่ผ่านเกณฑ์
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
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
                        <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
                          ยังไม่เสร็จสิ้นโครงการ
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    width: "100%",
                    height: "100%",
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
                        <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
                          เสร็จสิ้นตามระยะเวลาโครงการ
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            alignSelf: "flex-end",
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
                        <Text style={{ ...TEXT.caption1, color: COLOR.WHITE }}>
                          เกินระยะเวลาโครงการ
                        </Text>
                        <Text
                          style={{
                            ...TEXT.body1BOLD,
                            color: COLOR.WHITE,
                            flexGrow: 1,
                            alignSelf: "flex-end",
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
                    // flexDirection: "row",
                    // justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 11,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Text style={{ ...TEXT.caption1BOLD, color: COLOR.WHITE }}>
                    จำนวนผลผลิตรวม
                  </Text>
                  <Text
                    style={{
                      ...TEXT.header1BOLD,
                      fontSize: 60,
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
                  <Text style={{ ...TEXT.header1BOLD, color: COLOR.LIGHTGRAY }}>
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
                  <Text style={{ ...TEXT.header1BOLD, color: COLOR.LIGHTGRAY }}>
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
                    ...TEXT.caption1SemiBold,
                    fontSize: 40,
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
                    ...TEXT.caption1SemiBold,
                    fontSize: 40,
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
                    ...TEXT.caption1SemiBold,
                    fontSize: 40,
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
                    ...TEXT.caption1SemiBold,
                    fontSize: 40,
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
