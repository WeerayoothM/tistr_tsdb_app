import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import CardWithHeader from "../../components/CardWithHeader";

const data1 = [
  {
    label: "โครงการรวมทั้งหมด",
    value: "2,370",
  },
  {
    label: "สัญญาโครงการรวมทั้งหมด",
    value: "1,373",
  },
  {
    label: "ผลผลิตโครงการรวมทั้งหมด",
    value: "278",
  },
];

const data2 = [
  {
    label: "ผ่านเกณฑ์",
    value: "235",
  },
  {
    label: "ไม่ผ่านเกณฑ์",
    value: "6",
  },
  {
    label: "ยังไม่เสร็จสิ้น",
    value: "665",
  },
];

const data3 = [
  {
    label: "เสร็จสิ้นตามระยะเวลา",
    value: "241",
  },
  {
    label: "เกินระยะเวลา",
    value: "13",
  },
];

const data4 = [
  {
    label: "งบประมาณรวม (แผน)",
    value: "40,000,000",
  },
  {
    label: "ค่าใช้จ่ายรวม (ผล)",
    value: "36,488,960",
  },
];

const Dashboard = () => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px]"
    >
      <div>
        <CardWithHeader
          headerColor={"#E76F2D"}
          headerTitle={""}
          data={data1}
          direction="horizontal"
          unit="โครงการ"
          alignDirection="start"
        />
      </div>

      <div className="grid grid-cols-3 mt-[2rem] gap-[1rem]">
        <div className="col-span-1">
          <CardWithHeader
            headerColor={"#E76F2D"}
            headerTitle={"สถานะโครงการรวมทั้งหมด"}
            data={data2}
            direction="horizontal"
            unit="โครงการ"
            alignDirection="center"
          />
        </div>
        <div className="col-span-2 ">
          <div className="flex gap-[1rem] w-full">
            <div className="flex-1">
              <CardWithHeader
                headerColor={"#E76F2D"}
                headerTitle={"สถานะโครงการรวมทั้งหมด"}
                data={data2}
                direction="horizontal"
                unit="โครงการ"
                alignDirection="center"
              />
            </div>
            <div className="flex-1">
              <CardWithHeader
                headerColor={"#E76F2D"}
                headerTitle={"สถานะโครงการรวมทั้งหมด"}
                data={data3}
                direction="vertical"
                unit="โครงการ"
                alignDirection="center"
              />
            </div>
          </div>
          <div className="mt-[1rem]">
            <CardWithHeader
              headerColor={"#E76F2D"}
              headerTitle={"สถานะโครงการรวมทั้งหมด"}
              data={data4}
              direction="vertical"
              unit="บาท"
              alignDirection="center"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default observer(Dashboard);
