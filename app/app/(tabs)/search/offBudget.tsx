import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { TEXT } from "@/styles/TEXT";
import { COLOR } from "@/styles/COLOR";
import { Ionicons } from "@expo/vector-icons";
import XInput from "@/components/atoms/XInput";
import { ProjectContext } from "@/context/ProjectContext";
import XButton from "@/components/atoms/XButton";
import { useNavigation, useRouter } from "expo-router";
import XDropdown from "@/components/atoms/XDropdown";
import {
  projectBudgetOptions,
  projectGroupOptions,
  projectStatusOptions,
} from "@/constants/project";
import { Calendar } from "react-native-calendars";
import XSlideUp from "@/components/animations/XSlideUp";
import { SCREEN_WIDTH } from "@/styles/COMMON";
import XModal from "@/components/atoms/XModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const offBudget = () => {
  const {
    projectSearchState,
    setProjectSearchState,
    setProjectListState,
    resetProjectSearchState,
  } = useContext(ProjectContext);
  const [calendarStartDateOpen, setCalendarStartDateOpen] = useState(false);
  const [calendarEndDateOpen, setCalendarEndDateOpen] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // console.log("projectSearchState", projectSearchState);

    // const payload = {
    //   offset: 0,
    //   limit: 100,
    //   source: "OUT",
    //   emp_id: 0,
    //   data: projectSearchState,
    // };

    // const resp = await getSearchProject(payload);
    // console.log(resp);
    // setProjectListState(resp.data);

    router.push({
      pathname: "/search/result",
      params: { type: "offBudget" },
    });
  };

  useEffect(() => {
    resetProjectSearchState();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetProjectSearchState();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.OFFWHITE,
            paddingBottom: 40,
          }}
        >
          <Header title={"สืบค้นข้อมูลโครงการ"} height={150} />
          <View
            style={{
              height: 111,
              marginTop: 20,
              marginHorizontal: 20,
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../../assets/images/search_offbudget_bg.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: 100,
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
                }}
              >
                <Text style={{ ...TEXT.body2BOLD, color: COLOR.WHITE }}>
                  สืบค้นโครงการนอกงบประมาณ
                </Text>
                <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                  กรอกข้อมูลโครงการนอกงบประมาณ
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Ionicons name="search" size={30} color={COLOR.WHITE} />
              </View>
              {/* <XIconSearch color={COLOR.WHITE} width="30px" height="30px" /> */}
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, gap: 10 }}>
            <XDropdown
              labelText="สถานะโครงการ"
              placeHolder="เลือกสถานะโครงการ"
              onValueChange={(value) => {
                setProjectSearchState((prevState) => ({
                  ...prevState,
                  project_status: value,
                }));
              }}
              options={projectStatusOptions}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <XInput
                labelText="วันที่เริ่มโตรงการ"
                textProps={{
                  value: projectSearchState.start_date,
                  onChangeText: (text) => {
                    setProjectSearchState({
                      ...projectSearchState,
                      start_date: text,
                    });
                  },
                  placeholder: "เลือกวันที่",
                }}
                containerStyle={{ flex: 1 }}
                rightIcon={true}
                rightIconPress={() => {
                  setCalendarStartDateOpen(true);
                }}
                rightIconName={"calendar-check"}
                rightIconType="FontAwesome5"
                rightIconColor={COLOR.DARKGRAY}
                enabled={false}
              />
              <XModal
                visible={!!calendarStartDateOpen}
                onClose={() => {
                  setCalendarStartDateOpen(false);
                }}
                containerStyle={{
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <XSlideUp height={500} active={!!calendarStartDateOpen}>
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
                      markedDates={{
                        [projectSearchState.start_date]: {
                          selected: true,
                          selectedColor: COLOR.ORANGE,
                        },
                      }}
                      onDayPress={(day) => {
                        if (day.dateString === projectSearchState.start_date) {
                          setProjectSearchState({
                            ...projectSearchState,
                            start_date: "",
                          });
                        } else {
                          setProjectSearchState({
                            ...projectSearchState,
                            start_date: day.dateString,
                          });
                        }
                      }}
                    />
                    {/* <Calendar markedDates={marked} onDayPress={onDayPress} /> */}
                  </View>
                </XSlideUp>
              </XModal>
              <View
                style={{
                  width: 10,
                }}
              />
              <XInput
                labelText={"วันสิ้นสุดโครงการ"}
                textProps={{
                  value: projectSearchState.end_date,
                  onChangeText: (text) =>
                    setProjectSearchState({
                      ...projectSearchState,
                      end_date: text,
                    }),
                  placeholder: "เลือกวันที่",
                }}
                containerStyle={{ flex: 1 }}
                rightIcon={true}
                rightIconPress={() => {
                  setCalendarEndDateOpen(true);
                }}
                rightIconName={"calendar-check"}
                rightIconType="FontAwesome5"
                rightIconColor={COLOR.DARKGRAY}
                enabled={false}
              />
              <XModal
                visible={!!calendarEndDateOpen}
                onClose={() => {
                  setCalendarEndDateOpen(false);
                }}
                containerStyle={{
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <XSlideUp height={500} active={!!calendarEndDateOpen}>
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
                      markedDates={{
                        [projectSearchState.end_date]: {
                          selected: true,
                          selectedColor: COLOR.ORANGE,
                        },
                      }}
                      onDayPress={(day) => {
                        if (day.dateString === projectSearchState.end_date) {
                          setProjectSearchState({
                            ...projectSearchState,
                            end_date: "",
                          });
                        } else {
                          setProjectSearchState({
                            ...projectSearchState,
                            end_date: day.dateString,
                          });
                        }
                      }}
                    />
                  </View>
                </XSlideUp>
              </XModal>
            </View>
            <XInput
              labelText={"ผู้รับผิดชอบโครงการ"}
              textProps={{
                value: projectSearchState.project_responsible,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    project_responsible: text,
                  }));
                },
                placeholder: "ผู้รับผิดชอบโครงการ...",
              }}
              containerStyle={{ flex: 1 }}
            />
            <XDropdown
              labelText="กลุ่มงาน"
              placeHolder="เลือกกลุ่มงาน"
              onValueChange={(value) => {
                console.log("onValueChange", value);

                setProjectSearchState((prevState) => ({
                  ...prevState,
                  project_resp_dept: value,
                }));
              }}
              options={projectGroupOptions}
            />
            <XInput
              labelText={"ชื่อโครงการ"}
              textProps={{
                value: projectSearchState.project_name_th,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    project_name_th: text,
                  }));
                },
                placeholder: "ชื่อโครงการ...",
              }}
              containerStyle={{ flex: 1 }}
            />
            <XInput
              labelText={"รหัสโครงการ"}
              textProps={{
                value: projectSearchState.project_code,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    project_code: text,
                  }));
                },
                placeholder: "รหัสโครงการ...",
              }}
              containerStyle={{ flex: 1 }}
            />
            <XDropdown
              labelText="งบประมาณ"
              placeHolder="เลือกงบประมาณ"
              onValueChange={(value) => {
                setProjectSearchState((prevState) => ({
                  ...prevState,
                  budget_amount: value,
                }));
              }}
              options={projectBudgetOptions}
            />
            <XInput
              labelText={"เลขที่สัญญาโครงการ"}
              textProps={{
                value: projectSearchState.contract_no,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    contract_no: text,
                  }));
                },
                placeholder: "เลขที่สัญญาโครงการ...",
              }}
              containerStyle={{ flex: 1 }}
            />
            <XInput
              labelText={"บริษัทคู่สัญญา"}
              textProps={{
                value: projectSearchState.project_sub_dept,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    project_sub_dept: text,
                  }));
                },
                placeholder: "บริษัทคู่สัญญา...",
              }}
              containerStyle={{ flex: 1 }}
            />
            <XButton
              title="ค้นหา"
              containerStyle={{ marginTop: 40 }}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default offBudget;
