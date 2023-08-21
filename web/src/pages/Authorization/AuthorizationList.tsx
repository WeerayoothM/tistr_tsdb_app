import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty } from "lodash";
import "./style/index.css";
import numeral from "numeral";

import { Table } from "antd";
import { useStore } from "../../stores/stores";
import { changeActive, getUserList } from "./APIS";

const AuthorizationList = () => {
  const navigate = useNavigate();
  const authorizationStore = useStore("authorizationStore");

  const location = useLocation();
  const [userData, setUserData] = useState<{ [key: string]: any }[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<any>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [total, setTotal] = useState(0);

  const columns: any = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "ชื่อผู้ใช้งาน",
      dataIndex: "username",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "projectResponsible",
      render: (text: string, record: any) => (
        <div className="flex justify-start items-center gap-[10px] text-[#ADB5BD]">
          <div>{`${record.fname} ${record.lname}`}</div>
        </div>
      ),
    },
    {
      title: "หน่วยงาน",
      dataIndex: "subDivision",
      align: "center",
      render: (text: string, record: any) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "สิทธิ์การใช้งาน",
      dataIndex: "level",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div className="w-[15px] h-[15px] rounded-full bg-[#ADB5BD] shrink-0"></div>
          <div>ระดับ {text + 1}</div>
        </div>
      ),
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "isActive",
      render: (text: string, record: any) => {
        return (
          <div className=" flex items-center justify-center gap-[20px] max-w-[200px]">
            <img
              src={`/images/${text === "Y" ? "toggle-on" : "toggle-off"}.png`}
              alt=""
              className="w-[40px]"
              onClick={async () => {
                await changeActive(record.id, text === "Y" ? "N" : "Y");
                getUserData({ ...authorizationStore.searchObject });
              }}
            />
          </div>
        );
      },
      align: "center",
    },
    // {
    //   title: "จัดการ",
    //   dataIndex: "projectStatus",
    //   render: (text: string, record: any) => {
    //     return (
    //       <div className=" flex flex-col gap-[20px] max-w-[200px]">
    //         {/* toggle */}
    //       </div>
    //     );
    //   },
    //   align: "center",
    // },
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    getUserData({ ...authorizationStore.searchObject });
  }, [
    JSON.stringify(tableParams),
    JSON.stringify(authorizationStore.searchObject),
  ]);

  const getUserData = async (payload: any) => {
    try {
      const offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
      const resp = await getUserList({
        offset,
        limit: tableParams.pagination.pageSize,
        payload,
      });

      const data = get(resp, "data.item", []).map(
        (item: any, index: number) => {
          return { ...item, no: offset + index + 1 };
        }
      );

      setUserData(data);
      setTotal(get(resp, "data.total", 0));

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: get(resp, "data.total", 0),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleTableChange = (pagination: any) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUserData([]);
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
          รวมทั้งสิ้น {total} ผู้ใช้งาน
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-[10px] mb-[2rem]">
        {(Object.keys(authorizationStore.searchObject) || [])
          .filter((item) => authorizationStore.searchObject[item])
          .map((item: any, index) => (
            <div
              key={`search-item-${index}`}
              className="bg-[#BBBBBB] flex items-center gap-[1rem] rounded-full px-[1rem] py-[8px] text-white"
            >
              <div>{authorizationStore.searchObject[item]}</div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  authorizationStore.setSearchObject({
                    ...authorizationStore.searchObject,
                    [item]: "",
                  })
                }
              >
                x
              </div>
            </div>
          ))}
      </div> */}

      {/* Ant table */}
      <div className="out-budget">
        <Table
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       const projectId = get(record, "projectId");
          //       if (!projectId) return;
          //       navigate(`/project/${projectId}`);
          //     }, // click row
          //   };
          // }}
          rowKey={(record) => {
            return record.id;
          }}
          bordered
          columns={columns}
          dataSource={userData}
          loading={loading}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
        />
      </div>
      {/* Ant table */}
    </motion.div>
  );
};

export default observer(AuthorizationList);
