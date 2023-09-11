import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Header from "@/components/layout/Header";
import { ProjectContext, ProjectData } from "@/context/ProjectContext";
import { usePathname, useRouter, useSearchParams } from "expo-router";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { Ionicons } from "@expo/vector-icons";
import XButton from "@/components/atoms/XButton";
import { getAllProject, getSearchProject } from "./apis";
import CommonFooter from "@/components/layout/CommonFooter";

const result = () => {
  const {
    projectSearchState,
    projectListState,
    setProjectListState,
    setProjectSearchState,
  } = useContext(ProjectContext);
  const router = useRouter();
  const { type = "outProject" } = useSearchParams();
  const isOutProject = type === "outProject";

  const handleSubmit = async () => {
    console.log(type);
    console.log(isOutProject);

    const payload = {
      offset: 0,
      limit: 100,
      source: isOutProject ? "OUT" : "IN",
      emp_id: 0,
      data: projectSearchState,
    };
    const resp = await getSearchProject(payload);
    setProjectListState(() => resp.data.item);
  };

  useEffect(() => {
    if (type) {
      (async () => {
        await handleSubmit();
      })();
    }
  }, [type, projectSearchState]);

  const renderItem = ({ item }: { item: ProjectData }) => {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: COLOR.WHITE,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ ...TEXT.body2, color: COLOR.BLUE }}>
          {item.project_name_th}
        </Text>
        <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
          ผู้รับผิดชอบโครงการ {item.project_responsible}
        </Text>
        <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
          หน่วยงาน {item.project_location}
        </Text>
        <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
          ระยะเวลาดำเนินงาน {item.start_date} - {item.end_date}
        </Text>
        <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
          งบประมาณ {item.budget_amount} บาท
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: COLOR.DARKGREEN,
                }}
              />
              <View style={{ flex: 1, flexGrow: 1, marginHorizontal: 10 }}>
                <Text style={{ ...TEXT.caption2, color: COLOR.DARKGREEN }}>
                  {item.project_status}
                </Text>
              </View>
            </View>
            {item.fund_status ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    backgroundColor: COLOR.DARKGREEN,
                  }}
                />
                <View style={{ flex: 1, flexGrow: 1, marginHorizontal: 10 }}>
                  <Text style={{ ...TEXT.caption2, color: COLOR.DARKGREEN }}>
                    {item.fund_status.includes("อนุมัติ")
                      ? "อนุมัติทุน"
                      : "กำลังพิจารณาขอทุน"}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <XButton
            title="ดูโครงการ"
            containerStyle={{}}
            onPress={() => {
              router.push(`/search/${item.project_id}`);
            }}
          />
        </View>
      </View>
    );
  };
  const renderSearchItem = ({ item }) => {
    return (
      <View
        style={{
          paddingVertical: 3,
          paddingHorizontal: 11,
          backgroundColor: COLOR.DARKGRAY2,
          marginRight: 10,
          borderRadius: 12,
          flexDirection: "row",
        }}
      >
        <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>{item[1]}</Text>
        <TouchableOpacity
          style={{ marginLeft: 8 }}
          onPress={() => {
            setProjectSearchState((prev) => ({ ...prev, [item[0]]: "" }));
          }}
        >
          <Ionicons name="close" size={18} color={COLOR.WHITE} />
        </TouchableOpacity>
      </View>
    );
  };

  const searchList = Object.entries(projectSearchState).filter(
    (item) => !!item[1]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      > */}
      <View style={{ flexGrow: 1, backgroundColor: COLOR.OFFWHITE }}>
        <Header
          title={"สืบค้นข้อมูลโครงการ"}
          height={150}
          rightIcon={true}
          onPressRightIcon={() => router.back()}
        />
        <View
          style={{
            height: 111,
            marginTop: 20,
            marginHorizontal: 20,
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={
              isOutProject
                ? require(`../../../assets/images/search_outproject_bg.png`)
                : require(`../../../assets/images/search_inproject_bg.png`)
            }
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
              }}
            >
              <Text style={{ ...TEXT.body2BOLD, color: COLOR.WHITE }}>
                {isOutProject ? "โครงการนอกงบประมาณ" : "โครงการในงบประมาณ"}
              </Text>
              <Text style={{ ...TEXT.caption2, color: COLOR.WHITE }}>
                {isOutProject
                  ? "ผลการค้นหาข้อมูลโครงการนอกงบประมาณ"
                  : "ผลการค้นหาข้อมูลโครงการในงบประมาณ"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            gap: 10,
            paddingTop: 10,
          }}
        >
          <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
            ผลการสืบค้น {projectListState.length} โครงการ
          </Text>

          {searchList.length > 0 ? (
            <View style={{}}>
              <FlatList
                data={searchList}
                renderItem={renderSearchItem}
                keyExtractor={(item) => item[0]}
                horizontal={true} // Set the horizontal prop to true
                showsHorizontalScrollIndicator={false} // Optionally, hide the horizontal scrollbar
                // Other FlatList props can be added here if needed
              />
            </View>
          ) : null}
          {projectListState.length > 0 ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={projectListState}
                keyExtractor={(item: ProjectData) => item.project_id}
                renderItem={renderItem}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => <CommonFooter bottom={50} />}
              />
            </View>
          ) : (
            <View style={{ alignItems: "center", marginTop: 70 }}>
              <Text style={{ ...TEXT.header3, color: COLOR.DARKGRAY2 }}>
                ไม่พบข้อมูล
              </Text>
              <XButton
                title="ค้นหาใหม่"
                containerStyle={{ marginTop: 40 }}
                onPress={() => router.back()}
              />
            </View>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default result;
