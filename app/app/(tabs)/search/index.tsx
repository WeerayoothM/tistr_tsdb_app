import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import CardLayout from "@/components/layout/CardLayoutThin";
import { Image } from "react-native";
import XButton from "@/components/atoms/XButton";
import XButtonText from "@/components/atoms/XButtonText";
import { useRouter } from "expo-router";
import { ProjectContext } from "@/context/ProjectContext";
import { useContext } from "react";
import { getAllProject } from "./apis";

export default function Search() {
  const router = useRouter();
  const { projectSearchState, setProjectListState } =
    useContext(ProjectContext);

  const searchOutProject = () => {
    router.push("/search/outProject");
  };

  const searchInProject = () => {
    router.push("/search/inProject");
  };
  const searchAllInProject = async () => {
    const resp = await getAllProject(projectSearchState);
    setProjectListState(resp.data);

    router.push({
      pathname: "/search/result",
      params: { type: "inProject" },
    });
  };

  const searchAllOutProject = async () => {
    const resp = await getAllProject(projectSearchState);
    setProjectListState(resp.data);

    router.push({
      pathname: "/search/result",
      params: { type: "outProject" },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: COLOR.OFFWHITE }}
      >
        <View style={{ flex: 1, backgroundColor: COLOR.OFFWHITE }}>
          <ImageBackground
            source={require("../../../assets/images/header_search_bg.png")}
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
              paddingHorizontal: 20,
              paddingVertical: 40,
              paddingTop: 70,
              zIndex: 3,
              backgroundColor: COLOR.TRANSPARENT,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLOR.TRANSPARENT,
              }}
            >
              <Text
                style={{
                  ...TEXT.header1BOLD,
                  color: COLOR.WHITE,
                }}
              >
                สืบค้นข้อมูลโครงการ
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 70,
                backgroundColor: COLOR.TRANSPARENT,
              }}
            >
              <CardLayout
                containerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: COLOR.WHITE,
                  }}
                >
                  <View style={{ backgroundColor: COLOR.WHITE }}>
                    <Text style={{ ...TEXT.body1BOLD, color: COLOR.BLUE }}>
                      โครงการนอกงบประมาณ
                    </Text>
                    <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
                      สืบค้นข้อมูลโครงการนอกงบประมาณ
                    </Text>
                  </View>
                  <Image
                    source={require("../../../assets/images/project_icon_blue.png")}
                  />
                </View>
                <View
                  style={{
                    marginTop: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: COLOR.WHITE,
                  }}
                >
                  <XButtonText
                    title="ดูโครงการทั้งหมด >"
                    containerStyle={{}}
                    onPress={searchAllOutProject}
                  />
                  <XButton
                    title="ค้นหา"
                    containerStyle={{}}
                    onPress={searchOutProject}
                  />
                </View>
              </CardLayout>
              <View style={{ height: 20 }} />

              <CardLayout
                themeColor={COLOR.PURPLE}
                containerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: COLOR.WHITE,
                  }}
                >
                  <View style={{ backgroundColor: COLOR.WHITE }}>
                    <Text style={{ ...TEXT.body1BOLD, color: COLOR.PURPLE }}>
                      โครงการในงบประมาณ
                    </Text>
                    <Text style={{ ...TEXT.caption2, color: COLOR.DARKGRAY }}>
                      สืบค้นข้อมูลโครงการในงบประมาณ
                    </Text>
                  </View>
                  <Image
                    source={require("../../../assets/images/project_icon_purple.png")}
                  />
                </View>
                <View
                  style={{
                    marginTop: 50,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: COLOR.WHITE,
                  }}
                >
                  <XButtonText
                    title="ดูโครงการทั้งหมด >"
                    containerStyle={{}}
                    onPress={searchAllInProject}
                  />
                  <XButton
                    title="ค้นหา"
                    containerStyle={{}}
                    onPress={searchInProject}
                  />
                </View>
              </CardLayout>
            </View>
            {/* <View
              style={{ height: 1000, backgroundColor: COLOR.TRANSPARENT }}
            ></View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
