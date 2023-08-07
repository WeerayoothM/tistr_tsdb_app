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
    type: "text",
    labal: "ชื่อผู้ใช้งาน",
    placeholder: "ชื่อผู้ใช้งาน...",
    name: "username",
    options: [],
    col: "2",
  },
  {
    type: "text",
    labal: "ID",
    placeholder: "รหัสประจำตัว...",
    name: "userId",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "กลุ่มงาน",
    placeholder: "กลุ่มงาน",
    name: "group",
    options: projectGroupOptions,
    col: "2",
  },
  {
    type: "select",
    labal: "สิทธิ์การใช้งาน",
    placeholder: "สิทธิ์การใช้งาน",
    name: "license",
    options: projectBudgetOptions,
    col: "2",
  },
];
