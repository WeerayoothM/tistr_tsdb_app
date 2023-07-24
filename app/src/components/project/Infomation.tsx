import { View, Text } from "react-native";
import React from "react";
import { COLOR } from "@/styles/COLOR";
import Info from "../layout/Info";
import { ProjectData } from "@/context/ProjectContext";
import { formatDateToThaiDate } from "@/utils/format";

const Infomation = ({ project }: { project: ProjectData }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderRadius: 8,
          backgroundColor: COLOR.WHITE,
          // paddingVertical: 20,
        }}
      >
        <Info
          label={"ผู้รับผิดชอบโครงการ"}
          info={`${project.project_responsible}`}
        />
        {/* <View style></View> */}
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info label={"รหัสพนักงาน"} info={project.project_resp_emp_id} />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info label={"หน่วยงาน"} info={project.project_responsible} />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info label={"รหัสโครงการวิจัย"} info={project.project_code} />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info
          label={"วันที่อนุมัติโครงการ"}
          info={formatDateToThaiDate(project.approve_date, false, false, true)}
        />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info
          label={"ระยะเวลาดำเนินโครงการ"}
          info={`${formatDateToThaiDate(
            project.start_date,
            false,
            false,
            true
          )} - ${formatDateToThaiDate(project.end_date, false, false, true)}`}
        />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
        <Info label={"พื้นที่ดำเนินการ"} info={project.location_target} />
        <View
          style={{
            borderBottomColor: COLOR.LIGHTGRAY2,
            borderBottomWidth: 1,
          }}
        />
      </View>
    </View>
  );
};

export default Infomation;
