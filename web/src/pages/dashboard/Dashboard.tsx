import { useCallback, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import CardWithHeader from "../../components/CardWithHeader";
import Select from "../../components/Select";
import { get, isEmpty, isObject } from "lodash";
import ProjectCard from "../project/elements/ProjectCard";
import Charts from "./Chart/Charts";
import Ticket from "./Ticket";
import { getDoughnutChart, getMixedChart } from "./APIS";

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

const selectTemplate = [
  {
    key: "type",
    options: [
      {
        label: "โครงการทั้งหมด",
        value: "all",
      },
      {
        label: "โครงการนอกงบประมาณ",
        value: "out",
      },
      {
        label: "โครงการในงบประมาณ",
        value: "in",
      },
    ],
  },
  {
    key: "year",
    options: [
      {
        label: "พ.ศ. 2561",
        value: "2018",
      },
      {
        label: "พ.ศ. 2562",
        value: "2019",
      },
    ],
  },
];

const statusTemplate = [
  {
    label: "กำลังดำเนินการ",
    key: "",
    color: "#008F88",
  },
  {
    label: "รออนุมัติโครงการ",
    key: "",
    color: "#ADB5BD",
  },
  {
    label: "เกินระยะเวลาโครงการ",
    key: "",
    color: "#E9748C",
  },
  {
    label: "เสร็จสิ้นโครงการ",
    key: "",
    color: "#EF9B00",
  },
];

const contractTemplate = [
  {
    label: "สัญญาบริษัทรวม",
    key: "",
    unit: "สัญญา",
  },
  {
    label: "เงินทุนบริษัทรวม",
    key: "",
    unit: "บาท",
  },
  {
    label: "จำนวนทุนรวม",
    key: "",
    unit: "ทุน",
  },
  {
    label: "เงินทุนรวม",
    key: "",
    unit: "บาท",
  },
];

const inContractTemplate = [
  {
    label: "ทุน ววน. (FF)",
    key: "",
    color: "#FFB800",
  },
  {
    label: "อนุมัติแล้ว",
    key: "",
    color: "#008F88",
  },
  {
    label: "กำลังพิจารณา",
    key: "",
    color: "#E9748C",
  },
];

const resultTemplate = [
  {
    label: "publication",
    key: "",
  },
  {
    label: "IP",
    key: "",
  },
];

const Dashboard = () => {
  const [state, setState] = useState<any>({
    type: "all",
    year: "2018",
  });

  const [data, setData] = useState({
    allData: {},
    chart1: {},
    chart2: {},
    chart3: {},
    chart4: {},
  });
  const [nowDate, setNowDate] = useState("");

  const color = useMemo(() => {
    if (state.type === "all") return "#E76F2D";
    if (state.type === "out") return "#1265DC";
    return "#5140b0";
  }, [state.type]);

  const summary = useMemo(() => {
    return (data1 || []).map((item, index) => {
      return {
        ...item,
        color: index === 0 ? color : index === 1 ? "#34786A" : "#EF9B00",
      };
    });
  }, [state.type]);

  const evaluationResults = useMemo(() => {
    return (data2 || []).map((item, index) => {
      return {
        ...item,
        color: index === 0 ? "#008F88" : index === 1 ? "#E9748C" : "#ADB5BD",
      };
    });
  }, [state.type]);

  const periodResults = useMemo(() => {
    return (data3 || []).map((item, index) => {
      return {
        ...item,
        color: index === 0 ? "#FFA500" : index === 1 ? "#E9748C" : "#ADB5BD",
      };
    });
  }, [state.type]);

  const budgetDisbursementResults = useMemo(() => {
    return (data4 || []).map((item, index) => {
      return {
        ...item,
        color: index === 0 ? "#FF7A00" : index === 1 ? "#FFB800" : "#ADB5BD",
      };
    });
  }, [state.type]);

  useEffect(() => {
    scrollTop();
    formatDateThai();
  }, []);

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(state)]);

  const fetchData = async () => {
    try {
      const [chart1, chart2, chart3, chart4] = await Promise.all([
        getDoughnutChart({
          source: (state.type || "").toUpperCase(),
          year: state.year,
        }),
        getMixedChart({
          // source: (state.type || "").toUpperCase(),
          year: state.year,
        }),
        getMixedChart({
          // source: (state.type || "").toUpperCase(),
          year: state.year,
        }),
        getMixedChart({
          // source: (state.type || "").toUpperCase(),
          year: state.year,
        }),
      ]);

      const doughnutData = get(chart1, "data.data");
      const mixedData = get(chart2, "data.data");
      const barYData = get(chart3, "data.data");
      const barXData = get(chart4, "data.data");

      setData({
        ...data,
        chart1: doughnutData,
        chart2: mixedData,
        chart3: {
          labels: [
            "บริษัท1",
            "บริษัท2",
            "บริษัท3",
            "บริษัท4",
            "บริษัท5",
            "บริษัท6",
            "บริษัท7",
          ],
          datasets: [
            {
              axis: "y",
              label: "สัญญาบริษัท",
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: [
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
              ],
            },
          ],
        },
        chart4: {
          labels: [
            "ม.ค.",
            "ก.พ.",
            "มี.ค.",
            "เม.ย.",
            "พ.ค.",
            "มิ.ย.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
          ],
          datasets: [
            {
              axis: "y",
              label: "สัญญาบริษัท",
              data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: [
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
                "#008F88",
              ],
            },
          ],
        },
      });
    } catch (e) {
    } finally {
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

    setState({ ...state, [name]: value });
  };

  function formatDateThai() {
    const currentDate = new Date();
    const daysOfWeek = [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ];
    const months = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    const day = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear() + 543;

    setNowDate(`วัน${day} ${dayOfMonth} ${month} ${year}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px]"
    >
      <div className="flex justify-between mb-[2rem]">
        <div className="font-srb-500">
          <div className="text-[32px] text-[#666666] mb-[10px]">{nowDate}</div>
          <div className="text-[16px] text-[#ADB5BD]">
            อัพเดตล่าสุด 13:11 น. 17 เม.ษ. 2565
          </div>
        </div>
        <div className="flex gap-[10px]">
          {selectTemplate.map((item, index) => (
            <div key={`dashboard-select-template-${index}`}>
              <Select
                value={state[item.key]}
                option={item.options}
                onChange={handleChangeInput}
                name={item.key}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <ProjectCard
          cn={`flex-1 flex flex-col justify-center text-[#666666] h-full p-5`}
        >
          <div className={`grid grid-cols-3 `}>
            {summary.map((item, index) => (
              <div
                key={`card-${index}`}
                className={`flex flex-col items-start px-[1.5rem]`}
                style={{
                  borderRight:
                    index !== summary.length - 1 ? `2px solid #D9D9D9` : ``,
                }}
              >
                <div
                  className="font-srb-500 text-[16px] "
                  style={{ color: item.color }}
                >
                  {item.label}
                </div>
                <div
                  className="text-[64px] font-srb-600"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <div className="text-[#ADB5BD] text-[16px] font-srb-500">
                  โครงการ
                </div>
              </div>
            ))}
          </div>
        </ProjectCard>
      </div>

      <div className="grid grid-cols-3 mt-[2rem] gap-[1rem]">
        <div className="col-span-1 flex flex-col">
          <ProjectCard
            cn={`flex-1 flex flex-col justify-center text-[#666666] h-full`}
            headerTitle="สถานะโครงการรวมทั้งหมด"
            headerColor={color}
          >
            <div className="flex flex-col justify-between items-center">
              <div className="px-[2rem] py-[2rem]">
                {!isEmpty(data.chart1) && (
                  <Charts chartData={data.chart1} type="doughnut" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-[1rem] px-[2rem] ">
                {statusTemplate.map((item, index) => (
                  <div
                    key={`status-${index}`}
                    className="flex flex-col items-center"
                    style={{ color: item.color }}
                  >
                    <div className="font-srb-700 text-[31px]">536</div>
                    <div className="font-srb-400 text-[15px]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ProjectCard>
        </div>
        <div className="col-span-2 ">
          <div className="flex gap-[1rem] w-full">
            <div className="flex-1">
              <ProjectCard
                cn={`flex-1 flex flex-col text-[#666666] h-full`}
                headerTitle="ผลการประเมินโครงการรวมทั้งหมด"
                headerColor={color}
              >
                <div className={`grid grid-cols-3 py-5`}>
                  {evaluationResults.map((item, index) => (
                    <div
                      key={`card-${index}`}
                      className={`flex text-[#666666] flex-col items-center text-center px-[1.5rem]`}
                      style={{
                        borderRight:
                          index !== evaluationResults.length - 1
                            ? `2px solid #D9D9D9`
                            : ``,
                      }}
                    >
                      <div className="font-srb-500 text-[16px] line-clamp-1">
                        {item.label}
                      </div>
                      <div
                        className="text-[24px] font-srb-600"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </ProjectCard>
            </div>
            <div className="flex-1">
              <ProjectCard
                cn={`flex-1 flex flex-col text-[#666666] h-full`}
                headerTitle="ระยะเวลาดำเนินโครงการที่เสร็จสิ้น"
                headerColor={color}
              >
                <div className={`flex flex-col p-5`}>
                  {periodResults.map((item, index) => (
                    <div
                      key={`card-${index}`}
                      className={`flex justify-between gap-[10px]`}
                    >
                      <div className="font-srb-500 text-[16px] text-[#666666]">
                        {item.label}
                      </div>
                      <div
                        className="text-[24px] font-srb-600"
                        style={{ color: item.color }}
                      >
                        {item.value}
                        <span className="ml-[20px] text-[#ADB5BD] text-[16px] font-srb-500">
                          โครงการ
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ProjectCard>
            </div>
          </div>
          <div className="mt-[1rem]">
            <ProjectCard
              cn={`flex-1 flex flex-col text-[#666666] h-full`}
              headerTitle="การเบิกจ่ายงบประมาณรวมทั้งหมด"
              headerColor={color}
            >
              <div className={`flex flex-col p-5`}>
                {budgetDisbursementResults.map((item, index) => (
                  <div
                    key={`card-${index}`}
                    className={`flex justify-between gap-[10px]`}
                  >
                    <div className="font-srb-500 text-[16px] text-[#666666]">
                      {item.label}
                    </div>
                    <div
                      className="text-[24px] font-srb-600"
                      style={{ color: item.color }}
                    >
                      {item.value}
                      <span className="ml-[20px] text-[#ADB5BD] text-[16px] font-srb-500">
                        โครงการ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ProjectCard>
          </div>
          <div className="mt-[1rem] col-span-1 flex flex-col">
            <ProjectCard
              cn={`flex-1 text-[#666666] `}
              headerTitle="สถานะโครงการรวมทั้งหมด"
              headerColor={color}
            >
              <>
                <div className="flex items-center justify-between px-[1.5rem] pt-[1rem]">
                  <div className="text-[20px] text-[#666666] font-srb-500">
                    รายงานการเบิกจ่ายงบประมาณ
                  </div>
                  <div className="text-[20px] text-[#666666] font-srb-500">
                    ปี {state.year ? +state.year + 543 : ""}
                  </div>
                </div>
                <div className="px-[2rem] py-[1rem]">
                  {!isEmpty(data.chart2) && (
                    <Charts chartData={data.chart2} type="bubble" />
                  )}
                </div>
              </>
            </ProjectCard>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-[1rem] gap-[1rem]">
        <div className="col-span-2">
          <CardWithHeader
            headerColor={"#34786A"}
            headerTitle={"สัญญาโครงการทั้งหมด"}
          />
        </div>
        <div className="col-span-1">
          <CardWithHeader
            headerColor={"#E38C33"}
            headerTitle={"ผลผลิต / ผลลัพธ์โครงการภายในรวม"}
          />
        </div>
      </div>

      {state.type === "all" && (
        <div className="grid grid-cols-3 mt-[1rem] gap-[1rem]">
          <div className="col-span-2 grid grid-cols-2 gap-[1rem]">
            {contractTemplate.map((item, index) => (
              <Ticket
                cn={`flex-1 flex flex-col justify-center text-[#666666] h-full`}
                statusColor={"#34786A"}
                key={`contract-ticket-${index}`}
              >
                <div className="flex flex-col gap-[5px] p-[1rem] text-[#666666] text-[16px] font-srb-400">
                  <div>{item.label}</div>
                  <div className="text-[#008F88] text-[32px] font-srb-700">
                    230
                  </div>
                  <div>{item.unit}</div>
                </div>
              </Ticket>
            ))}
          </div>
          <div className="col-span-1 flex flex-col gap-[1rem]">
            {resultTemplate.map((item, index) => (
              <Ticket
                cn={`flex-1 flex flex-col justify-center text-[#666666] h-full`}
                key={`result-ticket-${index}`}
              >
                <div className="flex items-center justify-between p-[1rem] text-[#ADB5BD] text-[16px] font-srb-400">
                  <div>publication</div>
                  <div className="text-[#ADB5BD] text-[50px] font-srb-700">
                    230
                  </div>
                </div>
              </Ticket>
            ))}
          </div>
        </div>
      )}

      {state.type === "out" && (
        <div className="grid grid-cols-3 mt-[1rem] gap-[1rem]">
          <div className="col-span-2 grid grid-cols-2 gap-[1rem]">
            <Ticket cn={`flex-1 flex flex-col  text-[#666666] h-full`}>
              <>
                <div className="flex justify-between items-baseline px-[2rem] py-[1rem]">
                  <div className="text-[20px]">สัญญาบริษัท</div>
                  <div className="text-[#ADB5BD] text-[15px]">ปี 2565</div>
                </div>
                <div className=" w-full p-[1rem] text-[#ADB5BD] text-[16px] font-srb-400">
                  {!isEmpty(data.chart3) && (
                    <Charts chartData={data.chart3} type="barY" />
                  )}
                </div>
              </>
            </Ticket>
            <Ticket cn={`flex-1 flex flex-col  text-[#666666] h-full`}>
              <>
                <div className="flex justify-between items-baseline px-[2rem] py-[1rem]">
                  <div className="text-[20px]">เงินทุนบริษัท</div>
                  <div className="text-[#ADB5BD] text-[15px]">ปี 2565</div>
                </div>
                <div className=" w-full p-[1rem] text-[#ADB5BD] text-[16px] font-srb-400">
                  {!isEmpty(data.chart4) && (
                    <Charts chartData={data.chart4} type="barX" height={150} />
                  )}
                </div>
              </>
            </Ticket>
          </div>
          <div className="col-span-1 flex flex-col gap-[1rem]">
            {resultTemplate.map((item, index) => (
              <Ticket
                cn={`flex-1 flex flex-col justify-center text-[#666666] h-full`}
                key={`result-ticket-${index}`}
              >
                <div className="flex items-center justify-between p-[1rem] text-[#ADB5BD] text-[16px] font-srb-400">
                  <div>publication</div>
                  <div className="text-[#ADB5BD] text-[50px] font-srb-700">
                    230
                  </div>
                </div>
              </Ticket>
            ))}
          </div>
        </div>
      )}

      {state.type === "in" && (
        <div className="grid grid-cols-3 mt-[1rem] gap-[1rem]">
          <div className="col-span-2 grid grid-cols-2 gap-[1rem]">
            <Ticket cn={`flex-1 flex flex-col  text-[#666666] h-full`}>
              <>
                <div className="flex justify-between items-baseline px-[2rem] py-[1rem]">
                  <div className="text-[20px]">จำนวนทุน</div>
                  <div className="text-[#ADB5BD] text-[15px]">ปี 2565</div>
                </div>
                {/* inContractTemplate */}
                {inContractTemplate.map((template: any, index: number) => (
                  <div className="card-wrapper " key={`template4-${index}`}>
                    <div
                      className="px-[2rem] py-[1rem] flex justify-between items-baseline gap-[10px]"
                      style={{ color: template.color }}
                    >
                      <div className="text-[19px]">{template.label}</div>
                      <div className="text-[30px]">325</div>
                      {/* <div className="text-[#1265DC] text-[22px]">
                        {get(projectData, template.key, "-")}
                      </div> */}
                    </div>
                    {index !== (inContractTemplate || []).length - 1 && <hr />}
                  </div>
                ))}
              </>
            </Ticket>
            <Ticket
              cn={`flex-1 flex flex-col justify-center text-[#666666] h-full`}
            >
              <>
                <div className="flex justify-between items-baseline px-[2rem] py-[1rem]">
                  <div className="text-[20px]">เงินทุนรวม</div>
                  <div className="text-[#ADB5BD] text-[15px]">ปี 2565</div>
                </div>
                <div className=" w-full p-[1rem] text-[#ADB5BD] text-[16px] font-srb-400">
                  {!isEmpty(data.chart4) && (
                    <Charts chartData={data.chart4} type="barX" />
                  )}
                </div>
              </>
            </Ticket>
          </div>
          <div className="col-span-1 flex flex-col gap-[1rem]">
            {resultTemplate.map((item, index) => (
              <Ticket
                cn={`flex-1 flex flex-col justify-center text-[#666666] h-full`}
                key={`result-ticket-${index}`}
              >
                <div className="flex items-center justify-between p-[1rem] text-[#ADB5BD] text-[16px] font-srb-400">
                  <div>publication</div>
                  <div className="text-[#ADB5BD] text-[50px] font-srb-700">
                    230
                  </div>
                </div>
              </Ticket>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default observer(Dashboard);
