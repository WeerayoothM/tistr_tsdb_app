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
import { colorStatus } from "./Data/data";
import { useStore } from "../../stores/stores";

const ProjectList = () => {
  const navigate = useNavigate();
  const storeProject = useStore("projectStore");

  const [projectData, setProjectData] = useState<{ [key: string]: any }[]>([]);
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
        <div>
          {text +
            (tableParams.pagination.current - 1) *
              tableParams.pagination.pageSize}
        </div>
      ),
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
        const status = colorStatus.find((item) =>
          (text || "").includes(item.key)
        );
        const color = status ? status.color : "#000";
        return (
          <div className=" flex flex-col gap-[20px] max-w-[200px]">
            <div className="flex items-center gap-[10px]">
              <div
                className="w-[15px] h-[15px] rounded-full  shrink-0"
                style={{ backgroundColor: color }}
              ></div>
              <div style={{ color }}>{text}</div>
            </div>
            <div className="w-full h-[8.12px] rounded-[17px] bg-[#D9D9D9]">
              <div
                className={`h-[8.12px] rounded-[17px]`}
                style={{ width: `${percent}%`, backgroundColor: color }}
              ></div>
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    getProjectData({ ...storeProject.searchObject });
  }, [JSON.stringify(tableParams), JSON.stringify(storeProject.searchObject)]);

  const getProjectData = async (payload: any) => {
    setLoading(true);
    try {
      const offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
      const resp = await getProjectList({
        offset,
        limit: tableParams.pagination.pageSize,
        source: "out",
        payload,
      });

      const data = get(resp, "data.item", []).map(
        (item: any, index: number) => {
          return { ...item, no: offset + index + 1 };
        }
      );
      setProjectData(data);
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleTableChange = (pagination: any) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setProjectData([]);
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

      {!isEmpty(storeProject.searchObject) && (
        <div className="text-[#666666] font-srb-300 text-[34px] mb-[2rem]">
          ผลการสืบค้น {total} โครงการ :
        </div>
      )}

      <div className="flex flex-wrap gap-[10px] mb-[2rem]">
        {(Object.keys(storeProject.searchObject) || [])
          .filter((item) => storeProject.searchObject[item])
          .map((item: any, index) => (
            <div
              key={`search-item-${index}`}
              className="bg-[#BBBBBB] flex items-center gap-[1rem] rounded-full px-[1rem] py-[8px] text-white"
            >
              <div>{storeProject.searchObject[item]}</div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  storeProject.setSearchObject({
                    ...storeProject.searchObject,
                    [item]: "",
                  })
                }
              >
                x
              </div>
            </div>
          ))}
      </div>

      <div
        className="flex items-baseline mb-[2rem]"
        style={{
          justifyContent: isEmpty(storeProject.searchObject)
            ? "space-between"
            : "flex-end",
        }}
      >
        {isEmpty(storeProject.searchObject) && (
          <div className="text-[#666666] font-srb-300 text-[34px]">
            รวมทั้งสิ้น {total} โครงการ
          </div>
        )}
        <div className={`bg-[#FFA500] text-white rounded-[8px] p-[1rem]`}>
          ส่งออกรายงาน CSV
        </div>
      </div>

      {/* Ant table */}
      <div className="out-budget">
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
          rowKey={(record) => record.projectId}
          bordered
          columns={columns}
          dataSource={projectData}
          loading={loading}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
        />
      </div>
      {/* Ant table */}
    </motion.div>
  );
};

export default observer(ProjectList);
