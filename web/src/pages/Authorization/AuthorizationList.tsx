import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import "./style/index.css";
import numeral from "numeral";

import { Table } from "antd";
// import { getProjectList } from "./APIS";

const columns: any = [
  {
    title: "No",
    dataIndex: "key",
    align: "center",
  },
  {
    title: "ชื่อผู้ใช้งาน",
    dataIndex: "projectNameTh",
  },
  {
    title: "ชื่อ-นามสกุล",
    dataIndex: "projectResponsible",
  },
  {
    title: "หน่วยงาน",
    dataIndex: "budgetAmount",
    align: "center",
  },
  {
    title: "สิทธิ์การใช้งาน",
    dataIndex: "actualStartDate",
    render: (text: string) => (
      <div className="flex items-center gap-[10px]">
        <div className="w-[15px] h-[15px] rounded-full bg-[#000] shrink-0"></div>
        <div>{text}</div>
      </div>
    ),
    align: "center",
  },
  {
    title: "สถานะ",
    dataIndex: "projectStatus",
    render: (text: string, record: any) => {
      return (
        <div className=" flex flex-col gap-[20px] max-w-[200px]">
          {/* toggle */}
        </div>
      );
    },
    align: "center",
  },
  {
    title: "จัดการ",
    dataIndex: "projectStatus",
    render: (text: string, record: any) => {
      return (
        <div className=" flex flex-col gap-[20px] max-w-[200px]">
          {/* toggle */}
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

const AuthorizationList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectData, setProjectData] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    scrollTop();
    getProjectData({ ...defaultPayload, ...location.state });
  }, []);

  const getProjectData = async (payload: any) => {
    try {
      // const resp = await getProjectList(payload);
      // const data = get(resp, "data", []).map((item: any, index: number) => {
      //   return { ...item, key: index + 1 };
      // });
      // setProjectData(data);
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
        onClick={() => navigate("/authorization")}
      >
        <div>
          <img src="/images/project-left-arrow.png" alt="" />
        </div>
        <div className="text-[#ADB5BD] text-[17px]">ย้อนกลับ</div>
      </div>

      <div className="flex justify-start items-baseline mb-[2rem]">
        <div className="text-[#666666] font-srb-300 text-[34px]">
          รวมทั้งสิ้น {(projectData || []).length} ผู้ใช้งาน
        </div>
      </div>

      {/* Ant table */}
      <div>
        <Table
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

export default observer(AuthorizationList);
