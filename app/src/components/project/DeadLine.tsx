import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import { TEXT } from "@/styles/TEXT";
import { AntDesign } from "@expo/vector-icons";
import { dateDiff, formatDateToThaiDate } from "@/utils/format";
import { ProjectData } from "@/context/ProjectContext";

const DeadLine = ({ project }: { project: ProjectData }) => {
  const isComplete = project.project_status.includes("เสร็จสิ้น");
  const endDateDiff = dateDiff(project.end_date, new Date(), false);
  const isExceed = endDateDiff < 0;

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 27,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Text style={{ ...TEXT.caption2 }}>วันสิ้นสุดโครงการ</Text>
          <Text style={{ ...TEXT.caption1, color: COLOR.DARKGRAY }}>
            {formatDateToThaiDate(project.end_date, false, false, true)}
          </Text>
        </View>

        <Text
          style={{
            ...TEXT.body1,
            color: isComplete
              ? COLOR.ORANGE
              : isExceed
              ? COLOR.PINK
              : COLOR.DARKGREEN2,
          }}
        >
          {isComplete
            ? "เสร็จสิ้น"
            : isExceed
            ? `เกิน ${Math.abs(endDateDiff)} วัน`
            : `อีก ${Math.abs(endDateDiff)} วัน`}
        </Text>
      </View>
    </View>
  );
};

export default DeadLine;
