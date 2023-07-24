import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { get, isEmpty } from "lodash";
import "./style/index.css";
import numeral from "numeral";

import { Table } from "antd";
import { getProjectDetail } from "./APIS";
import ProjectCard from "./elements/ProjectCard";
import CardWithHeader from "../../components/CardWithHeader";
import GantChart from "./elements/GantChart";

const detailTemplate = [
  {
    label: "ผู้รับผิดชอบโครงการ",
    key: "projectResponsible",
  },
  {
    label: "รหัสพนักงาน",
    key: "researchProjectCode",
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
    label: "17 มี.ค. พ.ศ. 2565",
    key: "1",
  },
  {
    label: "25 เม.ษ. พ.ศ. 2565",
    key: "2",
  },
  {
    label: "สรุปการเบิกจ่าย",
    key: "3",
  },
];

const ProjectList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectData, setProjectData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    scrollTop();
    getProjectData();
  }, []);

  const getProjectData = async () => {
    try {
      const resp = await getProjectDetail(id);
      console.log("resp", resp);

      const data = get(resp, "data", []);
      setProjectData(data);
    } catch (e) {
      console.log(e);
    }
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
        onClick={() => navigate("/project/outbdg-search")}
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
                    30 ก.ค. พ.ศ. 2565
                  </div>
                </div>
                <div className="text-[28px]">
                  อีก <span className="text-[42px]">25</span> วัน
                </div>
              </div>

              <hr />

              <div className="px-[2rem] py-[1.5rem] flex flex-col gap-[2rem]">
                <div className="flex items-baseline gap-[20px]">
                  <div className="text-[15px]">สถานะ</div>
                  <div className="text-[23px]">กำลังดำเนินการ</div>
                </div>
                <div>
                  <div className="w-full h-[8.12px] rounded-[17px] bg-[#D9D9D9]">
                    <div
                      className={`h-[8.12px]  bg-[#000] rounded-[17px]`}
                      style={{ width: `50%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex flex-col gap-[10px] px-[2rem] py-[1.5rem] text-[21px]">
                <div className="">ผลการประเมินโครงการ</div>
                <div className="text-[#666666]">ยังไม่เสร็จสิ้นโครงการ</div>
              </div>
            </div>
          </ProjectCard>

          <ProjectCard cn={`mt-[1rem]  text-[#666666]`}>
            <>
              {!isEmpty(projectData) &&
                detailTemplate.map((template: any, index: number) => (
                  <div className="card-wrapper min-h-[95px]">
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
                  <div className="card-wrapper min-h-[95px]">
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[#1265DC] text-[22px]">
                        {get(projectData, template.key, "-")}
                      </div>
                    </div>
                    {index !== (detailTemplate2 || []).length - 1 && <hr />}
                  </div>
                ))}
            </>
          </ProjectCard>
        </div>

        {/* right */}
        <div className="h-full">
          <ProjectCard
            cn={`mt-[1rem] text-[#666666]`}
            headerTitle="รายละเอียดโครงการ"
            headerColor="#2F64D4"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate3.map((template: any, index: number) => (
                  <div className="card-wrapper min-h-[95px]">
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
        <GantChart />
      </div>

      <div className="grid grid-cols-2 gap-[1rem]">
        <div>
          <ProjectCard
            cn={`mt-[1rem]  text-[#666666]`}
            headerTitle="สถานะการเบิกจ่าย"
            headerColor="#2F64D4"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate4.map((template: any, index: number) => (
                  <div className="card-wrapper min-h-[95px]">
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
          <ProjectCard cn={`mt-[1rem]  text-[#666666]`}>
            <div className="px-[2rem] py-[1rem] flex flex-col gap-[10px]">
              <div className="text-[19px]">
                รายงานการเบิกจ่ายงบประมาณตลอดโครงการ
              </div>
            </div>
          </ProjectCard>
        </div>
        <div>
          <ProjectCard
            cn={`mt-[1rem]  text-[#666666]`}
            headerTitle="รายงานแผนการใช้เงิน"
            headerColor="#2F64D4"
          >
            <>
              {!isEmpty(projectData) &&
                detailTemplate5.map((template: any, index: number) => (
                  <div className="card-wrapper min-h-[95px]">
                    <div
                      key={`project-detail-${index}`}
                      className="px-[2rem] py-[1rem] flex flex-col gap-[10px]"
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[#1265DC] text-[22px]">
                        {get(projectData, template.key, "-")}
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
        <div className="grid grid-cols-4 px-[2rem] py-[1rem]">
          <div className="col-span-1">chart</div>
          <div className="col-span-3">
            <div className="flex items-center w-full justify-between">
              <div>เกณฑ์การประเมิน</div>
              <div>ผ่านเกณฑ์</div>
            </div>
            <hr />
            <div className="flex items-center w-full justify-between">
              <div>เกณฑ์การประเมิน (1)</div>
              <div>80</div>
            </div>
            <div className="flex items-center w-full justify-between">
              <div>เกณฑ์การประเมิน (2)</div>
              <div>76</div>
            </div>
            <div className="flex items-center w-full justify-between">
              <div>เกณฑ์การประเมิน (3)</div>
              <div>98</div>
            </div>
          </div>
        </div>
      </ProjectCard>

      <ProjectCard
        cn={`mt-[1rem]  text-[#666666]`}
        headerTitle="ผลผลิต / ผลลัพธ์โครงการ"
        headerColor="#E88F34"
      >
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
      </ProjectCard>
    </motion.div>
  );
};

export default observer(ProjectList);
