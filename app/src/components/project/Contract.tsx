import { View, Text } from "react-native";
import React from "react";
import Info from "../layout/Info";
import { COLOR } from "@/styles/COLOR";
import { ProjectData } from "@/context/ProjectContext";
import CardLayoutThick from "../layout/CardLayoutThick";
import { numberWithCommas } from "@/utils/format";

const Contract = ({ project }: { project: ProjectData }) => {
  return (
    <CardLayoutThick
      leftHeader={"สัญญาโครงการ"}
      rightHeader={""}
      themeColor={COLOR.GREEN}
      isCollapsible={false}
    >
      <View
        style={{
          borderRadius: 8,
          backgroundColor: COLOR.WHITE,
        }}
      >
        <Info label={"บริษัทคู่สัญญา"} info={`${project.contract_party}`} />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info label={"เลขที่สัญญาโครงการ"} info={project.contract_no} />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info
          label={"งบประมาณ"}
          info={numberWithCommas(project.budget_amount) + " บาท"}
        />
      </View>
    </CardLayoutThick>
  );
};

export default Contract;
