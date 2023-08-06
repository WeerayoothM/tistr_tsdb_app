export const projectTemplate = [
  {
    title: "สืบค้นโครงการนอกงบประมาณ",
    subTitle: "ข้อมูลโครงการวิจัยที่ดำเนินโครงการนอกงบประมาณ",
    link: "/project/outbdg-search",
    background: "bg-[url('/images/project-bg-1.png')]",
  },
  {
    title: "สืบค้นโครงการในงบประมาณ",
    subTitle: "ข้อมูลโครงการวิจัยที่ดำเนินโครงการในงบประมาณ",
    link: "/project/inbdg-search",
    background: "bg-[url('/images/project-bg-2.png')]",
  },
];

export const projectStatusOptions = [
  {
    label: "ตัวเลือก",
    value: "",
  },
  {
    label: `โครงการวิจัยเสร็จสิ้น`,
    value: `โครงการวิจัยเสร็จสิ้น`,
  },
  {
    label: `โครงการวิจัยเสร็จสิ้น (ต่อเนื่องที่ดำเนินการต่อในปีถัดไป)`,
    value: `โครงการวิจัยเสร็จสิ้น (ต่อเนื่องที่ดำเนินการต่อในปีถัดไป)`,
  },
  {
    label: `ดำเนินการตามแผน`,
    value: `ดำเนินการตามแผน`,
  },
];

export const projectGroupOptions = [
  {
    label: "กลุ่มงาน",
    value: "",
  },
];

export const projectBudgetOptions = [
  {
    label: "งบประมาณ",
    value: "",
  },
];

export const formTemplate = [
  {
    type: "select",
    labal: "สถานะโครงการ",
    placeholder: "สถานะโครงการ",
    name: "project_status",
    options: projectStatusOptions,
    col: "2",
  },
  {
    type: "date",
    labal: "วันเริ่มต้นโครงการ",
    placeholder: "เลือกวันที่",
    name: "start_date",
    options: [],
    col: "1",
  },
  {
    type: "date",
    labal: "วันสิ้นสุดโครงการ",
    placeholder: "เลือกวันที่",
    name: "end_date",
    options: [],
    col: "1",
  },
  {
    type: "text",
    labal: "ผู้รับผิดชอบโครงการ",
    placeholder: "ผู้รับผิดชอบโครงการ...",
    name: "project_responsible",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "กลุ่มงาน",
    placeholder: "กลุ่มงาน",
    name: "project_resp_dept",
    options: projectGroupOptions,
    col: "2",
  },
  {
    type: "text",
    labal: "ชื่อโครงการ",
    placeholder: "ชื่อโครงการ",
    name: "project_name_th",
    options: [],
    col: "4",
  },
  {
    type: "text",
    labal: "รหัสโครงการ",
    placeholder: "รหัสโครงการ",
    name: "project_code",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "งบประมาณ",
    placeholder: "งบประมาณ",
    name: "budget_amount",
    options: projectBudgetOptions,
    col: "2",
  },
  {
    type: "text",
    labal: "เลขที่สัญญา",
    placeholder: "เลขที่สัญญา",
    name: "contract_no",
    options: [],
    col: "2",
  },
  {
    type: "text",
    labal: "บริษัทคู่สัญญา",
    placeholder: "บริษัทคู่สัญญา",
    name: "project_sub_dept",
    options: [],
    col: "2",
  },
];

export const formTemplate2 = [
  {
    type: "select",
    labal: "สถานะโครงการ",
    placeholder: "สถานะโครงการ",
    name: "project_status",
    options: projectStatusOptions,
    col: "2",
  },
  {
    type: "date",
    labal: "วันเริ่มต้นโครงการ",
    placeholder: "เลือกวันที่",
    name: "start_date",
    options: [],
    col: "1",
  },
  {
    type: "date",
    labal: "วันสิ้นสุดโครงการ",
    placeholder: "เลือกวันที่",
    name: "end_date",
    options: [],
    col: "1",
  },
  {
    type: "select",
    labal: "ภาค",
    placeholder: "ภาค",
    name: "location_region",
    options: projectStatusOptions,
    col: "1",
  },
  {
    type: "select",
    labal: "จังหวัด",
    placeholder: "จังหวัด",
    name: "location_province",
    options: projectStatusOptions,
    col: "1",
  },
  {
    type: "select",
    labal: "อำเภอ",
    placeholder: "อำเภอ",
    name: "location_amphur",
    options: projectStatusOptions,
    col: "1",
  },
  {
    type: "select",
    labal: "ตำบล",
    placeholder: "ตำบล",
    name: "location_district",
    options: projectStatusOptions,
    col: "1",
  },

  {
    type: "select",
    labal: "หน่วยงานเจ้าของโครงการ",
    placeholder: "หน่วยงานเจ้าของโครงการ",
    name: "project_resp_dept",
    options: projectStatusOptions,
    col: "2",
  },
  {
    type: "select",
    labal: "หน่วยย่อย",
    placeholder: "หน่วยย่อย",
    name: "project_sub_dept",
    options: projectStatusOptions,
    col: "2",
  },
  {
    type: "text",
    labal: "ผู้รับผิดชอบโครงการ",
    placeholder: "ผู้รับผิดชอบโครงการ...",
    name: "project_responsible",
    options: [],
    col: "2",
  },
  {
    type: "text",
    labal: "พื้นที่เป้าหมาย",
    placeholder: "พื้นที่เป้าหมาย",
    name: "location_target",
    options: [],
    col: "2",
  },
  {
    type: "text",
    labal: "ชื่อโครงการ",
    placeholder: "ชื่อโครงการ",
    name: "project_name_th",
    options: [],
    col: "4",
  },
  {
    type: "text",
    labal: "รหัสโครงการ",
    placeholder: "รหัสโครงการ",
    name: "project_code",
    options: [],
    col: "2",
  },

  {
    type: "text",
    labal: "เลขที่สัญญา",
    placeholder: "เลขที่สัญญา",
    name: "contract_no",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "งบประมาณ",
    placeholder: "งบประมาณ",
    name: "budget_amount",
    options: projectBudgetOptions,
    col: "2",
  },
  {
    type: "text",
    labal: "แหล่งทุนวิจัย",
    placeholder: "แหล่งทุนวิจัย",
    name: "research_fund",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "สถานะการขอทุน",
    placeholder: "สถานะการขอทุน",
    name: "budget",
    options: projectBudgetOptions,
    col: "2",
  },
];

export const colorStatus = [
  {
    key: "โครงการวิจัยเสร็จสิ้น",
    color: "#FFA500",
  },
  {
    key: "กำลังดำเนินการ",
    color: "#008F88",
  },
  {
    key: "รอดำเนินการ",
    color: "#ADB5BD",
  },
  {
    key: "เกินระยะเวลา",
    color: "#E9748C",
  },
];
