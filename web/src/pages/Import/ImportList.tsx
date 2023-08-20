import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty, isObject } from "lodash";
import "./style/index.css";

import { Table } from "antd";
import { formTemplate } from "./Data/data";
import FormRenderer from "../../components/FormRenderer";
import { useStore } from "../../stores/stores";
import { getBatchList, getBatchType, getProperties } from "./APIS";
import dayjs from "dayjs";
// import { getProjectList } from "./APIS";

const ImportList = () => {
  const importStore = useStore("importStore");
  const navigate = useNavigate();
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [shareData, setShareData] = useState({
    batchType: [],
    batchStatus: [],
  });
  const [searchObject, setSearchObject] = useState<{ [key: string]: any }>({});
  const [fileFormData, setFileFormData] = useState<{ [key: string]: any }>({});
  const [formTemplateData, setFormTemplateData] = useState<any>(
    formTemplate || []
  ) as any;

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
      title: "รหัสงาน",
      dataIndex: "batchCode",
    },
    {
      title: "ประเภทงาน",
      dataIndex: "batchType",
      render: (text: string) => {
        const bt = shareData.batchType.find(
          (item: any) => item.batchType === text
        ) as any;
        return <div>{bt ? bt.batchTypeDesc : "-"}</div>;
      },
    },
    {
      title: "วันที่เริ่ม",
      dataIndex: "createdDate",
      align: "center",
      render: (text: string) => {
        return (
          <div>
            {dayjs(text).locale("th").add(543, "year").format("DD MMMM YYYY")}
          </div>
        );
      },
    },
    {
      title: "วันที่สิ้นสุด",
      dataIndex: "updatedDate",
      align: "center",
      render: (text: string) => {
        return (
          <div>
            {dayjs(text).locale("th").add(543, "year").format("DD MMMM YYYY")}
          </div>
        );
      },
    },
    {
      title: "เพิ่มเติม",
      dataIndex: "remark",
      align: "center",
    },
    {
      title: "วันที่บันทึก",
      dataIndex: "createdDate",
      align: "center",
      render: (text: string) => {
        return (
          <div>
            {dayjs(text).locale("th").add(543, "year").format("DD MMMM YYYY")}
          </div>
        );
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div className=" flex items-center justify-center gap-[20px] max-w-[200px]">
            <img
              src={`/images/info.png`}
              alt=""
              className="w-[15px]"
              onClick={async () => {
                navigate(`/import/edit/${record.batchCode}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    getData({ ...searchObject });
  }, [JSON.stringify(tableParams)]);

  const getData = async (payload: any) => {
    try {
      const offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
      const [batchListResponse, batchTypeResponse, batchStatusResponse] =
        await Promise.all([
          getBatchList({
            offset,
            limit: tableParams.pagination.pageSize,
            payload,
          }),
          getBatchType(),
          getProperties("BATCH_STATUS"),
        ]);
      const newData = get(batchListResponse, "data.item", []).map(
        (item: any, index: number) => {
          return { ...item, no: offset + index + 1 };
        }
      );

      const mappedType = get(batchTypeResponse, "data", []).map((item: any) => {
        return { label: item.batchTypeDesc, value: item.batchType };
      });

      const mappedStatus = get(batchStatusResponse, "data", []).map(
        (item: any) => {
          return { label: item.propertyText, value: item.propertyCode };
        }
      );

      const newFormTemplate = formTemplate.map((item) => {
        if (item.name === "batch_type") {
          return {
            ...item,
            options: [{ label: "ตัวเลือก", value: "" }, ...mappedType],
          };
        }
        if (item.name === "batch_status") {
          return {
            ...item,
            options: [{ label: "ตัวเลือก", value: "" }, ...mappedStatus],
          };
        }
        return item;
      });

      setFormTemplateData(newFormTemplate);

      setData(newData);
      setShareData({
        ...shareData,
        batchType: get(batchTypeResponse, "data", []),
        batchStatus: get(batchStatusResponse, "data", []),
      });
      setTotal(get(batchListResponse, "data.total", 0));
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: get(batchListResponse, "data.total", 0),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeInput = (
    e: any,
    key: string = "",
    type: string = "",
    detail: string = ""
  ) => {
    const value = (isObject(e) as any) ? e.target.value : e;
    const name = (isObject(e) as any) ? e.target.name : key;

    if (type === "checkbox") {
      const oldValue = get(searchObject, key, []) as any[];
      const setValue = oldValue.some((item: any) => +item === +value)
        ? oldValue.filter((item: string) => +item !== +value)
        : [...oldValue, +value];
      setSearchObject(
        detail
          ? { ...searchObject, [key]: setValue, [detail]: "" }
          : { ...searchObject, [key]: setValue }
      );
      return;
    }

    setSearchObject({ ...searchObject, [name]: value });
  };

  const handleDatePickerChange = (
    christDate: any,
    buddhistDate: any,
    name: string = ""
  ) => {
    setSearchObject({ ...searchObject, [name]: christDate });
  };

  const handleTableChange = (pagination: any) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleSearch = async () => {
    setTableParams({
      pagination: {
        current: 1,
        pageSize: 10,
      },
    });
    getData({ ...searchObject });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px] flex flex-col"
    >
      <div>
        {/* Form */}
        <div className="grid grid-cols-4 gap-[1rem]">
          {formTemplateData.map((item: any, index: number) => (
            <FormRenderer
              options={item.options}
              label={item.labal}
              name={item.name}
              type={item.type}
              value={searchObject[item.name]}
              handleChangeInput={handleChangeInput}
              key={`${item.name}-${index}`}
              placeholder={item.placeholder}
              col={item.col}
              handleDatePickerChange={handleDatePickerChange}
            />
          ))}
        </div>

        <div className="mt-[1rem] flex justify-end gap-[1rem]">
          <div
            className={`cursor-pointer min-w-[164px] text-white text-[20px] text-center p-[1rem] rounded-[8px] bg-[#336666]`}
            onClick={() => {
              navigate("/import/create");
            }}
          >
            นำเข้าข้อมูล
          </div>
          <div
            className={`cursor-pointer min-w-[164px] text-white text-[20px] text-center p-[1rem] rounded-[8px] bg-[#FFA500]`}
            onClick={handleSearch}
          >
            ค้นหา
          </div>
        </div>

        {/* Ant table */}
        <div className="out-budget mt-[2rem]">
          <Table
            rowKey={(record) => {
              return record.no;
            }}
            bordered
            columns={columns}
            dataSource={data}
            loading={loading}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
          />
        </div>
        {/* Ant table */}
      </div>
    </motion.div>
  );
};

export default observer(ImportList);
