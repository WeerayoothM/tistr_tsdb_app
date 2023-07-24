import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";
import { formatDateToThaiDate } from "@/utils/format";
import CardLayoutThick from "../layout/CardLayoutThick";
import XSlideDown from "../atoms/XSlideDown";
import { ProjectData } from "@/context/ProjectContext";

const Result = ({ project }: { project: ProjectData }) => {
  return (
    <View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
          {project.project_productivity ? project.project_productivity : "-"}
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
          ประเภทผลผลิต
        </Text>
        <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
          {project.productivity_type ? project.productivity_type : "-"}
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
          ปีผลผลิต
        </Text>
        <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
          {project.productivity_year
            ? `พ.ศ. ${project.productivity_year}`
            : "-"}
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
          Publication
        </Text>

        <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
          {project.publication ? project.publication : "-"}
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
          IP (โครงการที่นำไปต่อยอด)
        </Text>
        {!project.ip1 && !project.ip2 ? (
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>-</Text>
        ) : (
          <>
            <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
              {project.ip1}
            </Text>
            <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
              {project.ip2}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Result;
