import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useNavigate, useParams } from "react-router-dom";
import "./style/index.css";

import { Table } from "antd";
import { useStore } from "../../stores/stores";
import {
  cancelBatch,
  getBatchList,
  getBatchType,
  getProperties,
  processBatch,
} from "./APIS";
import { get, isEmpty, startCase } from "lodash";
import dayjs from "dayjs";
// import { getProjectList } from "./APIS";

const importFileListTemplate = [
  {
    label: "ข้อมูลโครงการ",
    key: "main",
  },
  {
    label: "ข้อมูลแผนการดำเนินงาน",
    key: "plan",
  },
  {
    label: "ข้อมูลกิจกรรม",
    key: "act",
  },
  {
    label: "ข้อมูลการเบิกจ่าย",
    key: "disb",
  },
  {
    label: "ข้อมูลการประเมินผล",
    key: "eva",
  },
];

const template1 = [
  {
    label: "รหัสการประมวลผล :",
    key: "batchCode",
  },
  {
    label: "ประเภทการประมวลผล :",
    key: "batchType",
  },
  {
    label: "วันที่เริ่ม :",
    key: "createdDate",
  },
  {
    label: "วันที่สิ้นสุด :",
    key: "updatedDate",
  },
  {
    label: "หมายเหตุ :",
    key: "remark",
  },
];

const template2 = [
  {
    label: "ผู้บันทึก :",
    key: "updatedBy",
  },
  {
    label: "สถานะการประมวลผล :",
    key: "batchStatus",
  },
  {
    label: "วันที่บันทึก :",
    key: "updatedDate",
  },
  {
    label: "ปัญหาการประมวลผล :",
    key: "exceptionCase",
  },
];

const ImportDetail = () => {
  const { id } = useParams();
  const importStore = useStore("importStore");
  const mainStore = useStore("mainStore");

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [shareData, setShareData] = useState<any>({
    batchStatus: [],
    batchType: [],
  });

  const [loading, setLoading] = useState(false);

  const columns: any = [
    {
      title: "ประเภทไฟล์",
      dataIndex: "batchType",
      render: (text: string, record: any) => {
        return <div className="text-[#1265DC]">{record.label}</div>;
      },
    },
    {
      title: "ชื่อไฟล์",
      dataIndex: "fileName",
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div>{get(data, `file${startCase(record.key)}Name`, "") || "-"}</div>
        );
      },
    },
    {
      title: "เสร็จสิ้น",
      dataIndex: "completed",
      align: "center",
      render: (text: string, record: any) => {
        return <div>{get(data, `${record.key}ImportedRecord`, "") || "-"}</div>;
      },
    },
    {
      title: "ล้มเหลว",
      dataIndex: "error",
      align: "center",
      render: (text: string, record: any) => {
        return <div>{get(data, `${record.key}RejectedRecord`, "") || "-"}</div>;
      },
    },
    {
      title: "รวม",
      dataIndex: "summary",
      align: "center",
      render: (text: string, record: any) => {
        return <div>{get(data, `${record.key}TotalRecord`, "") || "-"}</div>;
      },
    },
    {
      title: "ดาวน์โหลด",
      dataIndex: "download",
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div className="flex items-center justify-center gap-[20px] max-w-[200px]">
            <img
              src={`/images/download.png`}
              alt=""
              className="w-[20px]"
              onClick={async () => {}}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    scrollTop();
    getData();
  }, []);

  const getData = async () => {
    try {
      const offset = 0;
      const [batchListResponse, batchStatusResponse, batchTypeResponse] =
        await Promise.all([
          getBatchList({
            offset,
            limit: 1,
            payload: { batch_code: id },
          }),
          getProperties("BATCH_STATUS"),
          getBatchType(),
        ]);
      const [newData] = get(batchListResponse, "data.item", []);
      if (isEmpty(newData)) return;
      setData(newData);

      setShareData({
        ...shareData,
        batchStatus: get(batchStatusResponse, "data", []),
        batchType: get(batchTypeResponse, "data", []),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getValue = (value: any) => {
    const property = shareData.batchStatus.find(
      (item: any) => item.propertyCode === value
    );

    const batchType = shareData.batchType.find(
      (item: any) => item.batchType === value
    );

    const isDate = dayjs(value).isValid(); // Check if the value is a valid date
    if (isDate)
      return dayjs(value).locale("th").add(543, "year").format("DD MMMM YYYY");
    if (property) return property.propertyText;
    if (batchType) return batchType.batchTypeDesc;
    return value || "-";
  };

  const processing = async () => {
    try {
      if (isDisabled()) return;
      mainStore.setIsLoading(true);
      const resp = await processBatch(id);
      setTimeout(() => {
        getData();
      }, 5000);
    } catch (e) {
    } finally {
      mainStore.setIsLoading(false);
    }
  };

  const cancel = async () => {
    try {
      if (isDisabled()) return;
      mainStore.setIsLoading(true);
      const resp = await cancelBatch(id);
      await getData();
    } catch (e) {
    } finally {
      mainStore.setIsLoading(false);
    }
  };

  const isDisabled = () => {
    return ["C", "S", "P"].includes(get(data, "batchStatus", ""));
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
        onClick={() => navigate("/import")}
      >
        <div>
          <img src="/images/project-left-arrow.png" alt="" />
        </div>
        <div className="text-[#ADB5BD] text-[17px]">ย้อนกลับ</div>
      </div>

      <div className="px-[3rem]">
        <div className="grid grid-cols-2 text-[#666666] ">
          {/* left */}
          {[template1, template2].map((item, parentIndex) => (
            <div
              key={`detail-${parentIndex}`}
              className="flex flex-col gap-[10px]"
            >
              {item.map((item, index) => {
                const value = get(data, item.key, "-");
                const formattedValue = getValue(value) as string;

                return (
                  <div
                    key={`${item.key}-${index}`}
                    className="grid grid-cols-3"
                  >
                    <div className="col-span-1">{item.label}</div>
                    <div className="col-span-2">{formattedValue}</div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* right */}
        </div>

        <div className="flex justify-center gap-[2rem] mt-[2rem]">
          <div
            className={`cursor-${
              isDisabled() ? "not-allowed" : "pointer"
            } min-w-[164px] text-white text-[20px] text-center p-[1rem] rounded-[8px] bg-[#FFA500]`}
            onClick={processing}
          >
            ประมวลผล
          </div>
          <div
            className={`cursor-${
              isDisabled() ? "not-allowed" : "pointer"
            } min-w-[164px] text-[20px] text-center p-[1rem] rounded-[8px] border-solid border-[#FFA500] text-[#FFA500]`}
            onClick={cancel}
          >
            ยกเลิกประมวลผล
          </div>
        </div>

        {/* Import table */}
        <div className="out-budget mt-[2rem]">
          <Table
            rowKey={(record) => {
              return record.key;
            }}
            bordered
            columns={columns}
            dataSource={importFileListTemplate}
            loading={loading}
            pagination={false}
          />
        </div>
        {/* Import table */}
      </div>
    </motion.div>
  );
};

export default observer(ImportDetail);
