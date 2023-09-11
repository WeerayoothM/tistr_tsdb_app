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
import { projectBudgetOptions } from "@/constants/project";
import { DateData } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import XCalendar from "@/components/atoms/XCalendar";
import {
  getListGroup,
  getListResponsible,
  getListStatus,
  getListSubDivision,
} from "./apis";

const inProject = () => {
  const {
    projectSearchState,
    setProjectSearchState,
    setProjectListState,
    resetProjectSearchState,
  } = useContext(ProjectContext);
  const [calendarStartDateOpen, setCalendarStartDateOpen] = useState(false);
  const [listStatusOptions, setListStatusOptions] = useState([]);
  const [listResponsibleOptions, setListResponsibleOptions] = useState([]);
  const [listGroupOptions, setListGroupOptions] = useState([]);
  const [listSubDivisionOptions, setListSubDivisionOptions] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  const groupedData = require("../../../assets/data/thailand_region_data.json");

  const handleSubmit = async () => {
    router.push({
      pathname: "/search/result",
      params: { type: "inProject" },
    });
  };

  const prepareListGroup = async () => {
    const response = await getListGroup();
    const _listGroup = response.data.map(({ Group }) => ({
      label: Group,
      value: Group === "-" ? "" : Group,
    }));

    setListGroupOptions(() => _listGroup);
  };

  const prepareListSubDivision = async () => {
    const response = await getListSubDivision();
    const _listSub = response.data.map(({ SubDivision }) => ({
      label: SubDivision,
      value: SubDivision === "-" ? "" : SubDivision,
    }));
    setListSubDivisionOptions(() => _listSub);
  };

  const prepareListStatus = async () => {
    const response = await getListStatus();
    const _listSub = [
      {
        label: "- เลือกสถานะโครงการ -",
        value: "",
      },
    ].concat(
      response.data.map(({ project_status }) => ({
        label: project_status,
        value: project_status === "-" ? "" : project_status,
      }))
    );
    setListStatusOptions(() => _listSub);
  };

  const prepareListResponsible = async () => {
    const response = await getListResponsible();
    const _listSub = [
      {
        label: "- เลือกผู้รับผิดชอบ -",
        value: "",
      },
    ].concat(
      response.data.map(({ project_responsible }) => ({
        label: project_responsible,
        value: project_responsible === "-" ? "" : project_responsible,
      }))
    );
    setListResponsibleOptions(() => _listSub);
  };

  useEffect(() => {
    resetProjectSearchState();
    prepareListStatus();
    prepareListGroup();
    prepareListSubDivision();
    prepareListResponsible();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetProjectSearchState();
    });
    return unsubscribe;
  }, [navigation]);

  const regions = [{ label: "-- เลือกภาค --", value: "" }].concat(
    Object.keys(groupedData).map((region) => ({
      label: region,
      value: region,
    }))
  );

  const provinces = [{ label: "-- เลือกจังหวัด --", value: "" }].concat(
    projectSearchState.location_region
      ? Object.keys(groupedData[projectSearchState.location_region]).map(
          (province) => ({
            label: province,
            value: province,
          })
        )
      : []
  );

  const amphurs = [{ label: "-- เลือกอำเภอ --", value: "" }].concat(
    projectSearchState.location_province
      ? Object.keys(
          groupedData[projectSearchState.location_region][
            projectSearchState.location_province
          ]
        ).map((district) => ({
          label: district,
          value: district,
        }))
      : []
  );

  const tambons = [{ label: "-- เลือกตำบล --", value: "" }].concat(
    projectSearchState.location_amphur
      ? Object.keys(
          groupedData[projectSearchState.location_region][
            projectSearchState.location_province
          ][projectSearchState.location_amphur]
        ).map((tambon) => ({ label: tambon, value: tambon }))
      : []
  );

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
              source={require("../../../assets/images/search_inproject_bg.png")}
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
                  สืบค้นโครงการในงบประมาณ
                </Text>
                <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                  กรอกข้อมูลโครงการในงบประมาณ
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
              options={listStatusOptions}
              dependencyValue={projectSearchState.project_status}
            />
            <XDropdown
              labelText="หน่วยงานเจ้าของโครงการ"
              placeHolder="หน่วยงานเจ้าของโครงการ"
              onValueChange={(value) => {
                setProjectSearchState((prevState) => ({
                  ...prevState,
                  project_resp_dept: value,
                }));
              }}
              options={listGroupOptions}
              dependencyValue={projectSearchState.project_resp_dept}
            />
            <XDropdown
              labelText="หน่วยงานย่อย"
              placeHolder="หน่วยงานย่อย"
              onValueChange={(value) => {
                setProjectSearchState((prevState) => ({
                  ...prevState,
                  project_sub_dept: value,
                }));
              }}
              options={listSubDivisionOptions}
              dependencyValue={projectSearchState.project_sub_dept}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <XDropdown
                labelText="ภาค"
                placeHolder="ภาค"
                onValueChange={(value) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    location_region: value,
                  }));
                }}
                options={regions}
                containerStyle={{ flex: 1 }}
                zIndex={2000}
                listMode="MODAL"
                dependencyValue={projectSearchState.location_region}
              />
              <View
                style={{
                  width: 10,
                }}
              />

              <XDropdown
                labelText="จังหวัด"
                placeHolder="จังหวัด"
                onValueChange={(value) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    location_province: value,
                  }));
                }}
                options={provinces}
                containerStyle={{ flex: 1 }}
                listMode="MODAL"
                dependencyValue={projectSearchState.location_province}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                zIndex: 9,
              }}
            >
              <XDropdown
                labelText="อำเภอ"
                placeHolder="อำเภอ"
                onValueChange={(value) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    location_amphur: value,
                  }));
                }}
                options={amphurs}
                containerStyle={{ flex: 1 }}
                listMode="MODAL"
                dependencyValue={projectSearchState.location_amphur}
              />
              <View
                style={{
                  width: 10,
                }}
              />
              <XDropdown
                labelText="ตำบล"
                placeHolder="ตำบล"
                onValueChange={(value) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    location_district: value,
                  }));
                }}
                options={tambons}
                containerStyle={{ flex: 1 }}
                listMode="MODAL"
                dependencyValue={projectSearchState.location_district}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
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
              />
              <XCalendar
                calendarOpen={calendarStartDateOpen}
                onClose={() => {
                  setCalendarStartDateOpen(false);
                }}
                markedDates={{
                  [projectSearchState.start_date]: {
                    selected: true,
                    selectedColor: COLOR.ORANGE,
                  },
                }}
                onDayPress={(day: DateData) => {
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

              <View
                style={{
                  width: 10,
                }}
              />
              <XDropdown
                labelText="ปีงบ"
                placeHolder="ปีงบ"
                onValueChange={(value) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    budget_year: value,
                  }));
                }}
                options={[
                  {
                    label: "- เลือกปีงบ -",
                    value: "",
                  },
                  {
                    label: "พ.ศ. 2566",
                    value: "2566",
                  },
                  {
                    label: "พ.ศ. 2565",
                    value: "2565",
                  },
                  {
                    label: "พ.ศ. 2564",
                    value: "2564",
                  },
                  {
                    label: "พ.ศ. 2563",
                    value: "2563",
                  },
                  {
                    label: "พ.ศ. 2562",
                    value: "2562",
                  },
                  {
                    label: "พ.ศ. 2561",
                    value: "2561",
                  },
                ]}
                containerStyle={{ flex: 1 }}
                listMode="MODAL"
                dependencyValue={projectSearchState.budget_year}
              />
              {/* <XInput
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
              /> 
                <XCalendar
                calendarOpen={calendarEndDateOpen}
                onClose={() => {
                  setCalendarEndDateOpen(false);
                }}
                markedDates={{
                  [projectSearchState.end_date]: {
                    selected: true,
                    selectedColor: COLOR.ORANGE,
                  },
                }}
                onDayPress={(day: DateData) => {
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
              /> */}
            </View>
            {/* <XInput
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
            /> */}
            <XDropdown
              labelText="ผู้รับผิดชอบโครงการ"
              placeHolder="ผู้รับผิดชอบโครงการ..."
              onValueChange={(value) => {
                setProjectSearchState((prevState) => ({
                  ...prevState,
                  project_responsible: value,
                }));
              }}
              options={listResponsibleOptions}
              dependencyValue={projectSearchState.project_responsible}
            />
            <XInput
              labelText={"พื้นที่เป้าหมาย"}
              textProps={{
                value: projectSearchState.location_target,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    location_target: text,
                  }));
                },
                placeholder: "พื้นที่เป้าหมาย",
              }}
              containerStyle={{ flex: 1 }}
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
              dependencyValue={projectSearchState.budget_amount}
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
              labelText={"แหล่งทุนวิจัย"}
              textProps={{
                value: projectSearchState.research_fund,
                onChangeText: (text) => {
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    research_fund: text,
                  }));
                },
                placeholder: "แหล่งทุนวิจัย",
              }}
              containerStyle={{ flex: 1 }}
            />
            <XDropdown
              labelText="สถานะขอทุน"
              placeHolder="เลือกสถานะขอทุน"
              onValueChange={(value) => {
                setProjectSearchState((prevState) => ({
                  ...prevState,
                  project_status: value,
                }));
              }}
              options={listStatusOptions}
              dependencyValue={projectSearchState.project_status}
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

export default inProject;
