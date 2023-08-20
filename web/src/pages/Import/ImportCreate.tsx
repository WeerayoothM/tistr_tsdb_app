import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty, isObject } from "lodash";
import "./style/index.css";
import numeral from "numeral";

import { Table } from "antd";
import { formTemplate } from "./Data/data";
import FormRenderer from "../../components/FormRenderer";
import { useStore } from "../../stores/stores";
import Select from "../../components/Select";
import { getBatchType, uploadBatch } from "./APIS";
// import { getProjectList } from "./APIS";

const importFileListTemplate = [
  {
    label: "ข้อมูลโครงการ",
    key: "project_main",
  },
  {
    label: "ข้อมูลแผนการดำเนินงาน",
    key: "project_plan",
  },
  {
    label: "ข้อมูลกิจกรรม",
    key: "project_act",
  },
  {
    label: "ข้อมูลการเบิกจ่าย",
    key: "project_disb",
  },
  {
    label: "ข้อมูลการประเมินผล",
    key: "project_eva",
  },
];

const ImportCreate = () => {
  const importStore = useStore("importStore");
  const mainStore = useStore("mainStore");
  const navigate = useNavigate();
  const [fileFormData, setFileFormData] = useState<{ [key: string]: any }>({});
  const [comment, setComment] = useState("");
  const [batchType, setBatchType] = useState("");
  const [options, setOptions] = useState([]);

  const [isPerform, setIsPerform] = useState(false);

  const [loading, setLoading] = useState(false);

  const importColumn: any = [
    {
      title: "ประเภทข้อมูล",
      dataIndex: "label",
      align: "center",
      width: 400,
      render: (text: string, record: any) => {
        return (
          <div className="flex flex-col items-start">
            <div>{text}</div>
            <div className="text-[#1265DC]">
              {get(fileFormData, [record.key, "name"], "")}
            </div>
          </div>
        );
      },
    },
    {
      title: "นำเข้าข้อมูล",
      dataIndex: "status",
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-start">
            <div
              onClick={() => document.getElementById(record.key)?.click()}
              className="text-[#1A1A1A] text-[16px] bg-[#ADB5BD] rounded-[8px] px-[10px] py-[3px]"
            >
              Choose File
            </div>
            <input
              type="file"
              id={record.key}
              name={record.key}
              onChange={handleFileChange}
              className="hidden"
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
      const [batchTypeResponse] = await Promise.all([getBatchType()]);

      setOptions(
        get(batchTypeResponse, "data", []).reduce(
          (acc: any, current: any) => {
            return [
              ...acc,
              { label: current.batchTypeDesc, value: current.batchType },
            ];
          },
          [{ label: "ตัวเลือก", value: "" }]
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setFileFormData({ ...fileFormData, [name]: file });
  };

  const create = async () => {
    try {
      mainStore.setIsLoading(true);
      const keysToFormData = Object.keys(fileFormData);

      const formData = new FormData();
      formData.append("remark", comment);
      formData.append("batch_type", batchType);
      (keysToFormData || []).map((item) => {
        formData.append(item, fileFormData[item]);
      });

      const resp = await uploadBatch(formData);
      navigate("/import");
    } catch (e) {
      console.log(e);
    } finally {
      mainStore.setIsLoading(false);
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
        onClick={() => navigate("/import")}
      >
        <div>
          <img src="/images/project-left-arrow.png" alt="" />
        </div>
        <div className="text-[#ADB5BD] text-[17px]">ย้อนกลับ</div>
      </div>

      <div>
        {/* Import table */}
        <div className="out-budget mt-[2rem]">
          <Table
            rowKey={(record) => {
              return record.key;
            }}
            bordered
            columns={importColumn}
            dataSource={importFileListTemplate}
            loading={loading}
            pagination={false}
          />
        </div>
        {/* Import table */}

        <div className="flex gap-[2rem] items-center mt-[2rem]">
          <div>ประเภทการประมวลผล :</div>
          <div className="flex-1">
            <Select
              value={batchType}
              option={options}
              onChange={(e: any) => setBatchType(e.target.value)}
              name={name}
            />
          </div>
        </div>

        <div className="flex gap-[2rem] items-center mt-[2rem]">
          <div>หมายเหตุ</div>
          <div className="flex-1">
            <input
              type="text"
              name={"remark"}
              value={comment}
              placeholder=""
              onChange={(e) => setComment(e.target.value)}
              className="outline-none text-[#666666] font-srb-400 placeholder:text-[#ADB5BD] border-none bg-white rounded-[11px] px-[1rem] py-[1.25rem] w-full text-[16px]"
            />
          </div>
        </div>

        <div className="flex justify-center gap-[2rem] mt-[2rem]">
          <div
            className={`cursor-pointer min-w-[164px] text-white text-[20px] text-center p-[1rem] rounded-[8px] bg-[#FFA500]`}
            onClick={create}
          >
            สร้างรหัสประมวลผล
          </div>
          {/* <div
            className={`cursor-pointer min-w-[164px] text-[20px] text-center p-[1rem] rounded-[8px] border-solid border-[#FFA500] text-[#FFA500]`}
            onClick={() => {}}
          >
            ประมวลผล
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default observer(ImportCreate);
