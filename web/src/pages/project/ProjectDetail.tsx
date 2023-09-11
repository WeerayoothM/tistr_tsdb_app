import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { get, isEmpty, isNumber } from "lodash";
import "./style/index.css";
import numeral from "numeral";

import { Table } from "antd";
import {
  getListProjectDisbByCode,
  getListProjectEvaByCode,
  getListProjectPlanByCode,
  getProjectDetail,
} from "./APIS";
import ProjectCard from "./elements/ProjectCard";
import CardWithHeader from "../../components/CardWithHeader";
import GantChart from "./elements/GantChart";
import dayjs from "dayjs";
import { colorStatus, mockChart1 } from "./Data/data";
import Charts from "../dashboard/Chart/Charts";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "@emotion/styled";

const detailTemplate = [
  {
    label: "ผู้รับผิดชอบโครงการ",
    key: "projectResponsible",
  },
  {
    label: "รหัสพนักงาน",
    key: "projectRespEmpId",
  },
  {
    label: "หน่วยงาน",
    key: "projectRespDept",
  },
  {
    label: "รหัสโครงการวิจัย",
    key: "projectCode",
  },
  {
    label: "วันที่อนุมัติโครงการ",
    key: "approveDate",
  },
  {
    label: "ระยะเวลาดำเนินโครงการ",
    key: "",
  },
  {
    label: "พื้นที่ดำเนินการ",
    key: "projectLocation",
  },
];
const detailTemplate2 = [
  {
    label: "บริษัทคู่สัญญา",
    key: "contractParty",
  },
  {
    label: "เลขที่สัญญาโครงการ",
    key: "contractNo",
  },
  {
    label: "งบประมาณ",
    key: "budgetAmount",
  },
];
const detailTemplate3 = [
  {
    label: "",
    key: "projectDetails",
  },
  {
    label: "วัตถุประสงค์โครงการ",
    key: "projectObjective",
  },
  {
    label: "ตัวชี้วัดโครงการ",
    key: "projectMetrics",
  },
];

const detailTemplate4 = [
  {
    label: "งวดที่ 2",
    key: "2",
  },
  {
    label: "งวดที่ 1",
    key: "1",
  },
];

const detailTemplate5 = [
  {
    label: "-",
    key: "1",
  },
  {
    label: "-",
    key: "2",
  },
  {
    label: "สรุปการเบิกจ่าย",
    key: "3",
  },
];

const tableTemplate = [
  {
    title: "รายการ",
    key: "planName",
    // class: "w-[50px]",
  },
  {
    title: "M1",
    key: "m1",
    class: "w-[50px]",
  },
  {
    title: "M2",
    key: "m2",
    class: "w-[50px]",
  },
  {
    title: "M3",
    key: "m3",
    class: "w-[50px]",
  },
  {
    title: "M4",
    key: "m4",
    class: "w-[50px]",
  },
  {
    title: "M5",
    key: "m5",
    class: "w-[50px]",
  },
  {
    title: "M6",
    key: "m6",
    class: "w-[50px]",
  },
  {
    title: "M7",
    key: "m7",
    class: "w-[50px]",
  },
  {
    title: "M8",
    key: "m8",
    class: "w-[50px]",
  },
  {
    title: "M9",
    key: "m9",
    class: "w-[50px]",
  },
  {
    title: "M10",
    key: "m10",
    class: "w-[50px]",
  },
  {
    title: "M11",
    key: "m11",
    class: "w-[50px]",
  },
  {
    title: "M12",
    key: "m12",
    class: "w-[50px]",
  },
];

const ProjectList = () => {
  const navigate = useNavigate();
  const { id, code } = useParams();
  const [projectData, setProjectData] = useState<{ [key: string]: any }>({});
  const [projectPlanData, setProjectPlanData] = useState<{
    [key: string]: any;
  }>({});
  const [projectDisbData, setProjectDisbData] = useState<{
    [key: string]: any;
  }>({});
  const [projectProjectEvaData, setProjectProjectEvaData] = useState<{
    [key: string]: any;
  }>({});
  const [color, setColor] = useState("");
  const [chartData, setChartData] = useState({ chart1: {}, chart2: {} });

  useEffect(() => {
    scrollTop();
    getProjectData();
  }, []);

  const getProjectData = async () => {
    try {
      const [resp1, resp2, resp3, resp4] = await Promise.all([
        getProjectDetail(id),
        getListProjectPlanByCode(code),
        getListProjectDisbByCode(code),
        getListProjectEvaByCode(code),
      ]);

      const data1 = get(resp1, "data", []);
      const data2 = get(resp2, "data", []);
      const data3 = get(resp3, "data", []);
      const data4 = get(resp4, "data", []);

      setProjectData(data1);
      setProjectPlanData(data2);
      setProjectDisbData(data3);
      setProjectProjectEvaData(data4);
      setChartData({ ...chartData, chart1: mockChart1 });
      const status = colorStatus.find((item) =>
        get(data1, "projectStatus", "").includes(item.key)
      );
      const color = status ? status.color : "#000";
      setColor(color);
    } catch (e) {
      console.log(e);
    }
  };

  const getRemaining = () => {
    const endDate = get(projectData, "endDate", "");
    if (!endDate) return "";

    const now = dayjs();
    const end = dayjs(endDate);

    if (end.isBefore(now)) {
      return null;
    }

    const remainingDuration = end.diff(now, "day");

    return `${remainingDuration}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] w-[calc(100vw-350px)] px-[50px] py-[30px] flex flex-col"
    >
      <div
        className="flex items-center gap-[10px] font-srb-500 mb-[2rem] cursor-pointer"
        onClick={() => navigate("/project/list")}
      >
        <div>
          <img src="/images/project-left-arrow.png" alt="" />
        </div>
        <div className="text-[#ADB5BD] text-[17px]">ย้อนกลับ</div>
      </div>

      <div className="flex justify-between items-baseline mb-[2rem]">
        <div className="text-[#666666] font-srb-300 text-[34px]">
          รายละเอียดโครงการ
        </div>
        <div className={`bg-[#FFA500] text-white rounded-[8px] p-[1rem]`}>
          ส่งออกรายงาน CSV
        </div>
      </div>

      <div
        className={`shrink-0 bg-[url('/images/project-bg-1.png')] rounded-[8px] p-[2rem] bg-no-repeat bg-cover w-full mb-[1rem] min-h-[150px]`}
      >
        <div className="flex flex-col gap-[10px] text-white">
          <div className="text-[16px] font-srb-400">ชื่อโครงการ</div>
          <div className="text-[23px] font-srb-700">
            {get(projectData, "projectNameTh", "")}
          </div>
        </div>
      </div>

      <div
        className={`shrink-0 bg-[#fff] rounded-[8px] p-[2rem] bg-no-repeat bg-cover w-full min-h-[150px]`}
      >
        <div className="flex flex-col gap-[10px] text-[#666666]">
          <div className="text-[16px] font-srb-400">Project Name</div>
          <div className="text-[23px] font-srb-700">
            {get(projectData, "projectNameEn", "")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[1rem]">
        {/* left */}
        <div>
          {/* project overall */}
          <ProjectCard cn={`mt-[1rem] text-[#1A1A1A]`}>
            <div className="card-wrapper min-h-[95px]">
              <div className="px-[2rem] py-[1.5rem] flex w-full justify-between items-center">
                <div className="">
                  <div className="text-[19px]">วันสิ้นสุดโครงการ</div>
                  <div className="text-[#666666] text-[16px]">
                    {get(projectData, "endDate", "") && (
                      <div>
                        {dayjs(get(projectData, "endDate", ""))
                          .locale("th")
                          .add(543, "year")
                          .format("DD MMMM YYYY")}
                      </div>
                    )}
                  </div>
                </div>
                {!getRemaining() ? (
                  <div className="text-[28px]" style={{ color }}>
                    เสร็จสิ้น
                  </div>
                ) : (
                  <div className="text-[28px]" style={{ color }}>
                    อีก <span className="text-[42px]">{getRemaining()}</span>{" "}
                    วัน
                  </div>
                )}
              </div>

              <hr />

              <div className="px-[2rem] py-[1.5rem] flex flex-col gap-[2rem]">
                <div className="flex items-baseline gap-[20px]">
                  <div className="text-[15px]">สถานะ</div>
                  <div className="flex items-center gap-[10px]">
                    <div
                      className="w-[15px] h-[15px] rounded-full  shrink-0"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="text-[23px]" style={{ color }}>
                      {get(projectData, "projectStatus", "")}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full h-[8.12px] rounded-[17px] bg-[#D9D9D9]">
                    <div
                      className={`h-[8.12px]   rounded-[17px]`}
                      style={{
                        width: `${get(
                          projectData,
                          "projectEvaPercentage",
                          0
                        )}%`,
                        backgroundColor: color,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex flex-col gap-[10px] px-[2rem] py-[1.5rem] text-[21px]">
                <div className="">ผลการประเมินโครงการ</div>
                <div className="text-[#666666]">
                  {get(projectData, "fundStatus", "")}
                </div>
              </div>
            </div>
          </ProjectCard>

          <ProjectCard cn={`mt-[1rem]  text-[#666666]`}>
            <>
              {!isEmpty(projectData) &&
                detailTemplate.map((template: any, index: number) => (
                  <div
                    className="card-wrapper min-h-[95px]"
                    key={`template1-${index}`}
                  >
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[#1265DC] text-[22px]">
                        {get(projectData, template.key, "-")}
                      </div>
                    </div>
                    {index !== (detailTemplate || []).length - 1 && <hr />}
                  </div>
                ))}
            </>
          </ProjectCard>

          <ProjectCard
            cn={`mt-[1rem]  text-[#666666]`}
            headerTitle="สัญญาโครงการ"
            headerColor="#34786B"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate2.map((template: any, index: number) => (
                  <div
                    className="card-wrapper min-h-[95px]"
                    key={`template2-${index}`}
                  >
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[#1265DC] text-[22px]">
                        {get(projectData, template.key, "-") || "-"}
                      </div>
                    </div>
                    {index !== (detailTemplate2 || []).length - 1 && <hr />}
                  </div>
                ))}
            </>
          </ProjectCard>
        </div>

        {/* right */}
        <div className="h-full flex flex-col">
          <ProjectCard
            cn={`mt-[1rem] text-[#666666] flex-1`}
            headerTitle="รายละเอียดโครงการ"
            headerColor="#2F64D4"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate3.map((template: any, index: number) => (
                  <div
                    className="card-wrapper min-h-[95px]"
                    key={`template3-${index}`}
                  >
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px] font-srb-700">
                        {template.label}
                      </div>
                      <div className="text-[22px] font-srb-300">
                        {get(projectData, template.key, "-")}
                      </div>
                    </div>
                    {index !== (detailTemplate2 || []).length - 1 && <hr />}
                  </div>
                ))}
            </>
          </ProjectCard>
        </div>
      </div>

      <div className="mt-[1rem]">
        <CardWithHeader
          headerColor={"#2F64D4"}
          headerTitle={"แผนการดำเนินโครงการ"}
        />
      </div>

      <div className="w-full mt-[1rem]">
        {!isEmpty(projectPlanData) && (
          <table className="border-collapse w-full ">
            <thead>
              <tr>
                {tableTemplate.map((item, index) => (
                  <TableHeaderItem key={`table-header-${index}`}>
                    {item.title}
                  </TableHeaderItem>
                ))}
              </tr>
            </thead>
            <TableBody>
              {projectPlanData.map((planItem: any, planIndex: number) => (
                <tr key={`plan-item-${planIndex}`}>
                  {tableTemplate.map((template, templateIndex) => {
                    const isChecked = get(planItem, "planStatus", "") === "Y";
                    const isChecked2 = get(planItem, template.key, "") === "Y";
                    return (
                      <td
                        className="border-solid border-[#E8ECFD] text-center "
                        key={`career-column-${templateIndex}`}
                        style={{
                          padding: 0,
                          backgroundColor:
                            isChecked2 && templateIndex !== 0 ? "#2F64D4" : "",
                        }}
                      >
                        <div
                          className={`${
                            templateIndex === 0 &&
                            "flex gap-[10px] w-[300px] text-left"
                          }`}
                        >
                          {templateIndex === 0 && (
                            <div className="min-w-[50px] relative">
                              <div className="absolute flex items-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
                                <img
                                  src={
                                    isChecked
                                      ? "/images/outChecked.png"
                                      : "/images/inNotchecked.png"
                                  }
                                  alt=""
                                />
                              </div>
                              <div
                                className={`h-full ${
                                  (projectPlanData || []).length === 1 &&
                                  "hidden"
                                } ${planIndex === 0 && "h-1/2 bottom-0"} ${
                                  planIndex !== 0 &&
                                  planIndex ===
                                    (projectPlanData || []).length - 1 &&
                                  "h-1/2 top-0"
                                } absolute w-[3px] left-1/2 -translate-x-1/2`}
                                style={{
                                  backgroundColor: isChecked
                                    ? "#2F64D4"
                                    : "#ADB5BD",
                                }}
                              />
                            </div>
                          )}
                          <div className="py-[10px]">
                            {templateIndex === 0 &&
                              get(planItem, template.key, "")}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </TableBody>
          </table>
        )}
        {/* <GantChart projectData={projectData} color={"#5140b0"} /> */}
      </div>

      <div className="grid grid-cols-2 gap-[1rem]">
        <div className="h-full flex flex-col">
          <ProjectCard
            cn={`mt-[1rem] flex-1 text-[#666666]`}
            headerTitle="สถานะการเบิกจ่าย"
            headerColor="#2F64D4"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate4.map((template: any, index: number) => (
                  <div
                    className="card-wrapper min-h-[95px]"
                    key={`template4-${index}`}
                  >
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[#1265DC] text-[22px]">
                        {get(projectData, template.key, "-")}
                      </div>
                    </div>
                    {index !== (detailTemplate4 || []).length - 1 && <hr />}
                  </div>
                ))}
            </>
          </ProjectCard>
          <ProjectCard cn={`mt-[1rem] flex-1 text-[#666666]`}>
            <div className="px-[2rem] py-[1rem] ">
              <div className="text-[19px]">
                รายงานการเบิกจ่ายงบประมาณตลอดโครงการ
              </div>
              <div className="pt-[1rem]">
                {!isEmpty(chartData.chart1) && (
                  <Charts chartData={chartData.chart1} type="bubble" />
                )}
              </div>
            </div>
          </ProjectCard>
        </div>
        <div className="h-full flex flex-col">
          <ProjectCard
            cn={`mt-[1rem] flex-1 text-[#666666]`}
            headerTitle="รายงานแผนการใช้เงิน"
            headerColor="#2F64D4"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate5.map((template: any, index: number) => (
                  <div
                    className="card-wrapper min-h-[95px]"
                    key={`template5-${index}`}
                  >
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[#1265DC] text-[22px]">
                        {isNumber(get(projectData, template.key, "-"))
                          ? numeral(get(projectData, template.key, "-")).format(
                              "0,0"
                            )
                          : get(projectData, template.key, "-")}
                      </div>
                    </div>
                    {index !== (detailTemplate5 || []).length - 1 && <hr />}
                  </div>
                ))}
            </>
          </ProjectCard>
        </div>
      </div>

      <ProjectCard
        cn={`mt-[1rem]  text-[#666666]`}
        headerTitle="ผลการประเมินโครงการ"
        headerColor="#E88F34"
      >
        {!isEmpty(projectProjectEvaData) ? (
          <div className="grid grid-cols-12 gap-[2rem] px-[2rem] py-[1rem]">
            <div className="col-span-4 flex justify-center">
              <div className="w-[200px]">
                <CircularProgressbarWithChildren
                  value={+get(projectProjectEvaData, "percentage", 0)}
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: "#008F88",
                    strokeLinecap: "butt",
                    pathTransition: "none",
                  })}
                >
                  <div className="text-[#1A1A1A] text-[60px]">{"0%"}</div>
                  {/* <div className="text-[#ADB5BD] text-[18px]">ดีเยี่ยม</div> */}
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div className="col-span-8 text-[#666666] font-srb-400">
              <div className="flex items-center w-full justify-between font-srb-500">
                <div>เกณฑ์การประเมิน</div>
                <div className="text-[#008F88]">ผ่านเกณฑ์</div>
              </div>
              <hr className="my-[1.5rem]" />
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center w-full justify-between">
                  <div>เกณฑ์การประเมิน (1)</div>
                  <div>0</div>
                </div>
                <div className="flex items-center w-full justify-between">
                  <div>เกณฑ์การประเมิน (2)</div>
                  <div>0</div>
                </div>
                <div className="flex items-center w-full justify-between">
                  <div>เกณฑ์การประเมิน (3)</div>
                  <div>0</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </ProjectCard>

      <ProjectCard
        cn={`mt-[1rem]  text-[#666666]`}
        headerTitle="ผลผลิต / ผลลัพธ์โครงการ"
        headerColor="#E88F34"
      >
        <>
          <div className="px-[2rem] py-[1rem]">
            สภาพแวดล้อมทั่วไปของเกษตรกรในเขตพื้นที่ 5 จังหวัด
            หนองคาย,บึงกาฬ,นครพนม,มุกดาหาร และสกลนคร พบว่าการเพาะ
            เลี้ยงสัตว์น้ำเป็นตัวเลือกที่ น่าสนใจ ของเกษตรกรเป็นอย่างมาก
            เนื่องด้วยพื้นที่การปลูกยาง พารานั้นมักจะมีแหล่งเก็บน้ำที่
            มีน้ำตลอดทั้งปีอยู่แล้ว
            กอรปกับวงรอบการเลี้ยงของสัตว์น้ำจืดยังมีระยะที่สั้นทำให้
            มีรายได้สม่ำเสมอ วัตถุดิบและอาหารใน
            การเลี้ยงก็สามารถหาได้ง่ายในพื้นและมีราคาถูก
            อีกทั้งความต้องการของตลาดในพื้นที่ที่มีค่อนข้างสูง
          </div>

          <div className="grid grid-cols-4 px-[2rem] py-[1rem]">
            <div className="text-center">
              <div className="font-srb-600 text-[#666666] mb-[20px]">
                ประเภทผลผลิต
              </div>
              <div className=" text-[#666666]">
                {get(projectData, "technologyType", "-") || "-"}
              </div>
            </div>
            <div className="text-center">
              <div className="font-srb-600 text-[#666666] mb-[20px]">
                ปีผลผลิต
              </div>
              <div className=" text-[#666666]">
                {get(projectData, "productivityYear", "-") || "-"}
              </div>
            </div>
            <div className="text-center">
              <div className="font-srb-600 text-[#666666] mb-[20px]">
                Publication
              </div>
              <div className=" text-[#666666]">
                {get(projectData, "publication", "-") || "-" || "-"}
              </div>
            </div>
            <div className="text-center">
              <div className="font-srb-600 text-[#666666] mb-[20px]">
                IP (โครงการที่นำไปต่อยอด)
              </div>
              <div className=" text-[#666666]">
                {get(projectData, "ip1", "-") || "-"}
              </div>
              <div className=" text-[#666666]">
                {get(projectData, "ip2", "-") || "-"}
              </div>
            </div>
          </div>
        </>
      </ProjectCard>
    </motion.div>
  );
};

const TableHeaderItem = styled.th`
  border: 1px solid #e8ecfd;
  padding: 1em;
`;

const TableBody = styled.tbody``;

export default observer(ProjectList);
