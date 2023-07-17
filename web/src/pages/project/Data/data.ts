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
    label: "สถานะโครงการ",
    value: "",
  },
  {
    label: `กำลังดำเนินการ`,
    value: `กำลังดำเนินการ`,
  },
  {
    label: `เสร็จสิ้น`,
    value: `เสร็จสิ้น`,
  },
  {
    label: `รอดำเนินการ`,
    value: `รอดำเนินการ`,
  },
  {
    label: `เกินระยะเวลา`,
    value: `เกินระยะเวลา`,
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
    col: 2,
  },
  {
    type: "text",
    labal: "วันเริ่มต้นโครงการ",
    placeholder: "เลือกวันที่",
    name: "start_date",
    options: [],
    col: 1,
  },
  {
    type: "text",
    labal: "วันสิ้นสุดโครงการ",
    placeholder: "เลือกวันที่",
    name: "end_date",
    options: [],
    col: 1,
  },
  {
    type: "text",
    labal: "ผู้รับผิดชอบโครงการ",
    placeholder: "ผู้รับผิดชอบโครงการ...",
    name: "project_responsible",
    options: [],
    col: 2,
  },
  {
    type: "select",
    labal: "กลุ่มงาน",
    placeholder: "กลุ่มงาน",
    name: "project_resp_dept",
    options: projectGroupOptions,
    col: 2,
  },
  {
    type: "text",
    labal: "ชื่อโครงการ",
    placeholder: "ชื่อโครงการ",
    name: "project_name_th",
    options: [],
    col: 4,
  },
  {
    type: "text",
    labal: "รหัสโครงการ",
    placeholder: "รหัสโครงการ",
    name: "project_code",
    options: [],
    col: 2,
  },
  {
    type: "select",
    labal: "งบประมาณ",
    placeholder: "งบประมาณ",
    name: "budget_amount",
    options: projectBudgetOptions,
    col: 2,
  },
  {
    type: "text",
    labal: "เลขที่สัญญา",
    placeholder: "เลขที่สัญญา",
    name: "contract_no",
    options: [],
    col: 2,
  },
  {
    type: "text",
    labal: "บริษัทคู่สัญญา",
    placeholder: "บริษัทคู่สัญญา",
    name: "project_sub_dept",
    options: [],
    col: 2,
  },
];
