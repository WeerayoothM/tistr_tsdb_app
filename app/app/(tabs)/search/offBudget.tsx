import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import Header from "@/components/layout/Header";
import { TEXT } from "@/styles/TEXT";
import XIconSearch from "@/components/svg/XIconSearch";
import { COLOR } from "@/styles/COLOR";
import { Ionicons } from "@expo/vector-icons";
import XInput from "@/components/atoms/XInput";
import { ProjectContext } from "@/context/ProjectContext";
import XButton from "@/components/atoms/XButton";
import { getAllProject } from "./apis";
import { useRouter } from "expo-router";

const onBudget = () => {
  const { projectSearchState, setProjectSearchState, setProjectListState } =
    useContext(ProjectContext);
  const router = useRouter();

  const handleSubmit = async () => {
    console.log(projectSearchState);

    const resp = await getAllProject(projectSearchState);
    console.log(resp);
    setProjectListState(resp.data);

    router.push({
      pathname: "/search/result",
      params: { type: "offBudget" },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: COLOR.OFFWHITE }}>
          <Header title={"สืบค้นข้อมูลโครงการ"} height={150} />
          <View
            style={{
              height: 111,
              marginHorizontal: 20,
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../../assets/images/search_onbudget_blue_bg.png")}
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

          <View style={{ paddingHorizontal: 20 }}>
            <XInput
              labelText="สถานะโครงการ"
              textProps={{
                value: projectSearchState.project_status,
                onChangeText: (text) => {
                  console.log(text);
                  setProjectSearchState((prevState) => ({
                    ...prevState,
                    project_status: text,
                  }));

                  // setProjectSearchState((prev:any)=>{
                  //   ...prev,
                  //   project_status: text,
                  // });
                },
                placeholder: "สถานะโครงการ",
              }}
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
                containerStyle={{ flex: 1, marginTop: 10 }}
              />
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
                containerStyle={{ flex: 1, marginTop: 10 }}
              />
            </View>
            <XInput
              labelText={"ผู้รับผิดชอบโครงการ"}
              textProps={{
                value: projectSearchState.project_responsible,
                onChangeText: (text) => {},
                placeholder: "ผู้รับผิดชอบโครงการ...",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XInput
              labelText={"กลุ่มงาน"}
              textProps={{
                value: projectSearchState.project_resp_dept,
                onChangeText: (text) => {},
                placeholder: "กลุ่มงาน",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XInput
              labelText={"ชื่อโครงการ"}
              textProps={{
                value: projectSearchState.project_name_th,
                onChangeText: (text) => {},
                placeholder: "ชื่อโครงการ...",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XInput
              labelText={"รหัสโครงการ"}
              textProps={{
                value: projectSearchState.project_code,
                onChangeText: (text) => {},
                placeholder: "รหัสโครงการ...",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XInput
              labelText={"งบประมาณ"}
              textProps={{
                value: projectSearchState.budget_amount,
                onChangeText: (text) => {},
                placeholder: "งบประมาณ...",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XInput
              labelText={"เลขที่สัญญาโครงการ"}
              textProps={{
                value: projectSearchState.contract_no,
                onChangeText: (text) => {},
                placeholder: "เลขที่สัญญาโครงการ...",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XInput
              labelText={"บริษัทคู่สัญญา"}
              textProps={{
                value: projectSearchState.project_sub_dept,
                onChangeText: (text) => {},
                placeholder: "บริษัทคู่สัญญา...",
              }}
              containerStyle={{ flex: 1, marginTop: 10 }}
            />
            <XButton
              title="ค้นหา"
              containerStyle={{ marginTop: 40 }}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default onBudget;
