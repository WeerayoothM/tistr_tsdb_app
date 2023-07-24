import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import "./style/index.css";
import numeral from "numeral";

import { Table } from "antd";
import { getProjectList } from "./APIS";

const columns: any = [
  {
    title: "No",
    dataIndex: "key",
    align: "center",
  },
  {
    title: "ชื่อโครงการ",
    dataIndex: "projectNameTh",
    render: (text: string, record: any) => (
      <div className="max-w-[350px]">
        <div className="text-[#666666]">
          ID : {get(record, "researchProjectCode", "-")}
        </div>
        <div className="text-[#1265DC]">
          {get(record, "projectNameTh", "-")}
        </div>
      </div>
    ),
  },
  {
    title: "ผู้รับผิดชอบโครงการ",
    dataIndex: "projectResponsible",
    render: (text: string, record: any) => (
      <div className="text-[#666666] max-w-[150px] flex flex-col gap-[10px] items-center text-center">
        <div className="">{text}</div>
        <div className="">{get(record, "projectRespDept", "-")}</div>
      </div>
    ),
    align: "center",
  },
  {
    title: "งบประมาณ (บาท)",
    dataIndex: "budgetAmount",
    render: (text: string) => (
      <div className="text-[#666666] text-center">
        <div className="">{numeral(text).format("0,0")}</div>
      </div>
    ),
    align: "center",
  },
  {
    title: "ระยะเวลา",
    dataIndex: "actualStartDate",
    render: (text: string, record: any) => (
      <div className="text-[#666666] flex flex-col items-center gap-[10px]">
        <div>
          <div>เริ่มโครงการ</div>
          <div>{get(record, "actualStartDate", "")}</div>
        </div>
        <div>
          <div>สิ้นสุดโครงการ</div>
          <div>{get(record, "actualEndDate", "")}</div>
        </div>
      </div>
    ),
    align: "center",
  },
  {
    title: "สถานะโครงการ",
    dataIndex: "projectStatus",
    render: (text: string, record: any) => {
      const percent = get(record, "projectEvaPercentage", 0);
      return (
        <div className=" flex flex-col gap-[20px] max-w-[200px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[15px] h-[15px] rounded-full bg-[#000] shrink-0"></div>
            <div>{text}</div>
          </div>
          <div className="w-full h-[8.12px] rounded-[17px] bg-[#D9D9D9]">
            <div
              className={`h-[8.12px]  bg-[#000] rounded-[17px]`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      );
    },
    align: "center",
  },
];

const defaultPayload = {
  project_status: "",
  start_date: "",
  end_date: "",
  location_region: "",
  location_province: "",
  location_amphur: "",
  location_district: "",
  project_resp_dept: "",
  project_sub_dept: "",
  project_responsible: "",
  location_target: "",
  project_name_th: "",
  project_code: "",
  contract_no: "",
  budget_amount: "",
  research_fund: "",
};

const ProjectList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectData, setProjectData] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    scrollTop();
    getProjectData({ ...defaultPayload, ...location.state });
  }, []);

  const getProjectData = async (payload: any) => {
    try {
      const resp = await getProjectList(payload);
      const data = get(resp, "data", []).map((item: any, index: number) => {
        return { ...item, key: index + 1 };
      });
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
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px] flex flex-col"
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

      {!isEmpty(location.state) && (
        <div className="text-[#666666] font-srb-300 text-[34px] mb-[2rem]">
          ผลการสืบค้น {(projectData || []).length} โครงการ :
        </div>
      )}
      <div
        className="flex items-baseline mb-[2rem]"
        style={{
          justifyContent: isEmpty(location.state)
            ? "space-between"
            : "flex-end",
        }}
      >
        {isEmpty(location.state) && (
          <div className="text-[#666666] font-srb-300 text-[34px]">
            รวมทั้งสิ้น {(projectData || []).length} โครงการ
          </div>
        )}
        <div className={`bg-[#FFA500] text-white rounded-[8px] p-[1rem]`}>
          ส่งออกรายงาน CSV
        </div>
      </div>

      {/* Ant table */}
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys: any, selectedRows: any) => {
              console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
              );
            },
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const projectId = get(record, "projectId");
                if (!projectId) return;
                navigate(`/project/${projectId}`);
              }, // click row
            };
          }}
          bordered
          columns={columns}
          dataSource={projectData}
        />
      </div>
      {/* Ant table */}
    </motion.div>
  );
};

export default observer(ProjectList);
