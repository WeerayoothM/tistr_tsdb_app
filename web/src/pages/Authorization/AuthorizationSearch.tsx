import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import CardWithHeader from "../../components/CardWithHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isObject } from "lodash";
import FormRenderer from "../../components/FormRenderer";
import { formTemplate } from "./Data/data";
import { useStore } from "../../stores/stores";
import { runInAction } from "mobx";

const AuthorizationSearch = () => {
  const navigate = useNavigate();
  const authorizationStore = useStore("authorizationStore");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    scrollTop();
    runInAction(() => {
      authorizationStore.setSearchObject({});
    });
  }, []);

  const handleChangeInput = (
    e: any,
    key: string = "",
    type: string = "",
    detail: string = ""
  ) => {
    const value = (isObject(e) as any) ? e.target.value : e;
    const name = (isObject(e) as any) ? e.target.name : key;

    if (type === "checkbox") {
      const oldValue = get(formData, key, []) as any[];
      const setValue = oldValue.some((item: any) => +item === +value)
        ? oldValue.filter((item: string) => +item !== +value)
        : [...oldValue, +value];
      setFormData(
        detail
          ? { ...formData, [key]: setValue, [detail]: "" }
          : { ...formData, [key]: setValue }
      );
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleDatePickerChange = (
    christDate: any,
    buddhistDate: any,
    name: string = ""
  ) => {
    setFormData({ ...formData, [name]: christDate });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px] flex flex-col"
    >
      <div
        className={`flex shrink-0 items-center justify-between bg-[url('/images/project-bg-1.png')] rounded-[8px] h-[170px] px-[2rem] bg-no-repeat bg-cover w-full`}
      >
        <div className="flex flex-col gap-[10px] text-white">
          <div className="text-[31px] font-srb-700">ค้นหาผู้ใช้งาน</div>
          <div className="text-[22px] font-srb-400">
            ข้อมูลจัดการสิทธิ์ผู้ใช้งานภายในหน่วยงาน
          </div>
        </div>
        <div>
          <img src="/images/project-find.png" alt="" />
        </div>
      </div>
      <div
        className="mt-[1rem] grid gap-[1rem]"
        style={{ gridTemplateColumns: "auto auto auto auto" }}
      >
        {formTemplate.map((item, index) => (
          <FormRenderer
            options={item.options}
            label={item.labal}
            name={item.name}
            type={item.type}
            value={formData[item.name]}
            handleChangeInput={handleChangeInput}
            key={`${item.name}-${index}`}
            placeholder={item.placeholder}
            col={item.col}
            handleDatePickerChange={handleDatePickerChange}
          />
        ))}
      </div>
      <div className="font-srb-500 flex items-center justify-between gap-[2rem] mt-[2rem]">
        <div
          className="text-[#FFA500] text-[16px] cursor-pointer"
          onClick={() => navigate("/authorization/list")}
        >
          {"ผู้ใช้งานทั้งหมด >"}
        </div>
        <div
          className="text-white text-[20px] py-[1rem] px-[3rem] cursor-pointer rounded-[8px]"
          style={{
            backgroundColor: (Object.values(formData) || []).some(
              (item) => !!item
            )
              ? "#FFA500"
              : "#D8D9E8",
          }}
          onClick={() => {
            const canSearch = (Object.values(formData) || []).some(
              (item) => !!item
            );
            if (!canSearch) return;
            authorizationStore.setSearchObject(formData);
            navigate("/authorization/list");
          }}
        >
          ค้นหา
        </div>
      </div>
    </motion.div>
  );
};

export default observer(AuthorizationSearch);
