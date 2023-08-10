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
    title: "ฐานข้อมูล",
    dataIndex: "database",
  },
  {
    title: "วัน - เวลา อัพเดตล่าสุด",
    dataIndex: "updatedAt",
  },
  {
    title: "สถานะข้อมูล",
    dataIndex: "status",
    align: "center",
  },
];

const tabOptions = [
  {
    text: "ตรวจสอบตารางข้อมูล",
    type: "check",
  },
  {
    text: "นำเข้าข้อมูล",
    type: "import",
  },
  {
    text: "ส่งออกข้อมูล",
    type: "export",
  },
  {
    text: "รายงานการนำเข้าข้อมูล",
    type: "report",
  },
];

const Import = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectData, setProjectData] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    scrollTop();
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
      <div className="grid grid-cols-4 gap-[1rem] mb-[3rem]">
        {tabOptions.map((item, index) => (
          <div
            key={`button-import-${index}`}
            className="cursor-pointer text-white text-[20px] text-center p-[1rem] rounded-[8px] bg-[#FFA500]"
          >
            {item.text}
          </div>
        ))}
      </div>
      {/* Ant table */}
      <div className="out-budget">
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

export default observer(Import);
