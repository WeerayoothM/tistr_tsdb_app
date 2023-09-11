import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getProjectById } from "./apis";
import { ProjectData } from "@/context/ProjectContext";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import Header from "@/components/layout/Header";
import Status from "@/components/project/Status";
import DeadLine from "@/components/project/DeadLine";
import CardLayoutThick from "@/components/layout/CardLayoutThick";
import {
  formatDateToThaiDate,
  getString,
  numberWithCommas,
} from "@/utils/format";
import XSlideDown from "@/components/atoms/XSlideDown";
import Infomation from "@/components/project/Infomation";
import Contract from "@/components/project/Contract";
import Timeline from "@/components/project/Timeline";
import Summary from "@/components/project/Summary";
import Estimate from "@/components/project/Estimate";
import Result from "@/components/project/Result";

const Project = () => {
  const { project_id } = useLocalSearchParams<{ project_id: string }>();
  const [project, setProject] = useState<ProjectData>(null);
  const [showFundStatus, setShowFundStatus] = useState<boolean>(true);
  const [showProjectDetail, setShowProjectDetail] = useState<boolean>(true);
  const [showFinancialReport, setShowFinancialReport] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(true);
  const router = useRouter();
  const fetchProject = async () => {
    const resp = await getProjectById(project_id);
    setProject(resp.data);
  };

  useEffect(() => {
    (async () => {
      await fetchProject();
    })();
  }, []);

  if (!project) {
    return (
      <View>
        <Text style={{ color: COLOR.WHITE }}>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.OFFWHITE,
            paddingBottom: 40,
          }}
        >
          <Header
            title={"สืบค้นข้อมูลโครงการ"}
            height={150}
            rightIcon={true}
            onPressRightIcon={() => router.back()}
          />
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 20,
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../../assets/images/project_banner_blue_bg.png")}
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
                paddingVertical: 20,
                paddingHorizontal: 20,
                width: "100%",
                // height: "100%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                  ชื่อโครงการ
                </Text>
                <Text style={{ ...TEXT.body2BOLD, color: COLOR.WHITE }}>
                  {project.project_name_th}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 20, marginTop: 20 }}>
            <Status
              project_status={project.project_status}
              percent={
                project.project_eva_percentage
                  ? Number(project.project_eva_percentage)
                  : 0
              }
              end_date={project.end_date}
            />
            <DeadLine project={project} />
            <CardLayoutThick
              leftHeader={"ผลการประเมินโครงการ"}
              rightHeader={""}
              themeColor={COLOR.ORANGE}
              isCollapsible={false}
            >
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    ...TEXT.caption2,
                    color: COLOR.DARKGRAY,
                    flexWrap: "wrap",
                  }}
                >
                  {project.project_eva_result}
                </Text>
              </View>
            </CardLayoutThick>

            <CardLayoutThick
              leftHeader={"สถานะการเบิกจ่าย"}
              rightHeader={project.fund_status}
              themeColor={COLOR.BLUE}
              isCollapsible={true}
              isCollapsed={showFundStatus}
              onPressHeader={() => setShowFundStatus(!showFundStatus)}
            >
              <XSlideDown active={showFundStatus}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text style={{ ...TEXT.body2BOLD, color: COLOR.BLUE }}>
                    งวดที่ 1
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <View style={{ flexGrow: 1, gap: 8 }}>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        วันที่ดำเนินการ
                      </Text>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        จำนวนเงิน
                      </Text>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        สถานะ
                      </Text>
                    </View>
                    <View style={{ flexGrow: 1, gap: 8 }}>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        {formatDateToThaiDate(
                          project.approve_date,
                          false,
                          false,
                          true
                        )}
                      </Text>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        {numberWithCommas(project.budget_amount)} บาท
                      </Text>
                      <Text
                        style={{
                          ...TEXT.caption1SemiBold,
                          color:
                            project.fund_status === "อนุมัติ"
                              ? COLOR.DARKGREEN
                              : COLOR.PINK,
                        }}
                      >
                        {project.fund_status}
                      </Text>
                    </View>
                  </View>
                </View>
              </XSlideDown>
            </CardLayoutThick>

            <Infomation project={project} />

            <Contract project={project} />

            <CardLayoutThick
              leftHeader={"รายละเอียดโครงการ"}
              rightHeader={""}
              themeColor={COLOR.BLUE}
              isCollapsible={true}
              isCollapsed={showProjectDetail}
              onPressHeader={() => setShowProjectDetail(!showProjectDetail)}
            >
              <XSlideDown active={showProjectDetail}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                    {project.project_details}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: COLOR.LIGHTGRAY2,
                    borderBottomWidth: 1,
                  }}
                />
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text
                    style={{
                      ...TEXT.caption1BOLD,
                      color: COLOR.DARKGRAY,
                      marginBottom: 20,
                    }}
                  >
                    วัตถุประสงค์โครงการ
                  </Text>
                  <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                    {getString(project.project_objective)}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomColor: COLOR.LIGHTGRAY2,
                    borderBottomWidth: 1,
                  }}
                />
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text
                    style={{
                      ...TEXT.caption1BOLD,
                      color: COLOR.DARKGRAY,
                      marginBottom: 20,
                    }}
                  >
                    ตัวชี้วัดโครงการ
                  </Text>
                  <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                    {getString(project.project_indicator)}
                  </Text>
                </View>
              </XSlideDown>
            </CardLayoutThick>
            <Timeline
              data={[
                {
                  description: "Event One Description",
                  time: new Date(),
                  complete: true,
                  current: false,
                },
                {
                  description: "Event Two Description",
                  time: new Date(),
                  complete: true,
                  current: false,
                },
                {
                  description: "Event Three Description",
                  time: new Date(),
                  complete: true,
                  current: false,
                },
                {
                  description: "Event Four Description",
                  time: new Date(),
                  complete: true,
                  current: false,
                },
                {
                  description: "Event Five Description",
                  time: new Date(),
                  complete: false,
                  current: true,
                },
                {
                  description: "Event Six Description",
                  time: new Date(),
                  complete: false,
                  current: false,
                },
                {
                  description: "Event Seven Description",
                  time: new Date(),
                  complete: false,
                  current: false,
                },
              ]}
            />

            <CardLayoutThick
              leftHeader={"รายงานแผนการใช้เงิน"}
              rightHeader={""}
              themeColor={COLOR.BLUE}
              isCollapsible={true}
              isCollapsed={showFinancialReport}
              onPressHeader={() => setShowFinancialReport(!showFinancialReport)}
            >
              <XSlideDown active={showFinancialReport}>
                <View>
                  {[{ id: "ID0001" }, { id: "ID0002" }].map((item) => (
                    <View
                      key={item.id}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: COLOR.LIGHTGRAY2,
                      }}
                    >
                      <Text style={{ ...TEXT.body2BOLD, color: COLOR.BLUE }}>
                        17 มี.ค. พ.ศ. 2565
                      </Text>
                      <Text
                        style={{
                          ...TEXT.caption1SemiBold,
                          color: COLOR.DARKGRAY,
                          marginTop: 7,
                        }}
                      >
                        กิจกรรมให้ความรู้เกษตรกร ครั้งที่ 1
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 12,
                        }}
                      >
                        <View style={{ flexGrow: 1, gap: 8 }}>
                          <Text
                            style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}
                          >
                            งบประมาณ
                          </Text>
                          <Text
                            style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}
                          >
                            ค่าใช้จ่ายจริง
                          </Text>
                          <Text
                            style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}
                          >
                            สถานะ
                          </Text>
                        </View>
                        <View style={{ flexGrow: 1, gap: 8 }}>
                          <Text
                            style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}
                          >
                            {numberWithCommas(50000)} บาท
                          </Text>
                          <Text
                            style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}
                          >
                            {numberWithCommas(47500)} บาท
                          </Text>
                          <Text
                            style={{
                              ...TEXT.caption1SemiBold,
                              color:
                                "เสร็จสิ้น" === "เสร็จสิ้น"
                                  ? COLOR.ORANGE
                                  : COLOR.DARKGREEN,
                            }}
                          >
                            เสร็จสิ้น
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: COLOR.LIGHTGRAY2,
                  }}
                >
                  <Text style={{ ...TEXT.body2BOLD, color: COLOR.BLUE }}>
                    สรุปการเบิกจ่าย
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    <View style={{ flexGrow: 1, gap: 8 }}>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        งบประมาณรวม
                      </Text>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        ค่าใช้จ่ายจริง
                      </Text>
                    </View>
                    <View style={{ flexGrow: 1, gap: 8 }}>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        {numberWithCommas(50000)} บาท
                      </Text>
                      <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
                        {numberWithCommas(47500)} บาท
                      </Text>
                    </View>
                  </View>
                </View>
              </XSlideDown>
            </CardLayoutThick>

            <CardLayoutThick
              leftHeader={"รายงานสรุปโครงการ"}
              rightHeader={""}
              themeColor={COLOR.ORANGE}
              onlyHeader={true}
            />

            <Summary project={project} />

            <CardLayoutThick
              leftHeader={"ผลการประเมินโครงการ"}
              rightHeader={""}
              themeColor={COLOR.ORANGE}
              onlyHeader={true}
            />

            <Estimate />

            <CardLayoutThick
              leftHeader={"ผลลัพธ์ / ผลผลิตโครงการ"}
              rightHeader={""}
              themeColor={COLOR.ORANGE}
              isCollapsible={true}
              isCollapsed={showResult}
              onPressHeader={() => setShowResult(!showResult)}
            >
              <XSlideDown active={showResult}>
                <Result project={project} />
              </XSlideDown>
            </CardLayoutThick>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Project;
