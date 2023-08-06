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
    title: "ID",
    dataIndex: "projectNameEn",
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

const AdminList = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    scrollTop();
    getAdminData();
  }, []);

  const getAdminData = async () => {
    try {
      // const resp = await getAdminList(payload);
      // const data = get(resp, "data", []).map((item: any, index: number) => {
      //   return { ...item, key: index + 1 };
      // });
      // setAdminData(data);
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
      <div className="flex mb-[2rem]">
        <div className="flex items-center cursor-pointer justify-center rounded-[8px] bg-[#FFA500] text-[20px] h-[60px] w-[230px] text-[white] ">
          + เพิ่มแอดมิน
        </div>
      </div>

      {/* Ant table */}
      <div className="out-budget">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const adminId = get(record, "adminId");
                if (!adminId) return;
                navigate(`/admin/${adminId}`);
              }, // click row
            };
          }}
          bordered
          columns={columns}
          dataSource={adminData}
        />
      </div>
      {/* Ant table */}
    </motion.div>
  );
};

export default observer(AdminList);
