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
    label: "สิทธิ์การใช้งาน",
    value: "",
  },
  {
    label: "Level0",
    value: "0",
  },
  {
    label: "Level1",
    value: "1",
  },
  {
    label: "Level2",
    value: "2",
  },
  {
    label: "Level3",
    value: "3",
  },
  {
    label: "Level4",
    value: "4",
  },
];

export const formTemplate = [
  {
    type: "text",
    labal: "ชื่อผู้ใช้งาน",
    placeholder: "ชื่อผู้ใช้งาน...",
    name: "FName",
    options: [],
    col: "2",
  },
  {
    type: "text",
    labal: "ID",
    placeholder: "รหัสประจำตัว...",
    name: "EmpId",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "กลุ่มงาน",
    placeholder: "กลุ่มงาน",
    name: "group",
    options: [],
    col: "2",
  },
  {
    type: "select",
    labal: "สิทธิ์การใช้งาน",
    placeholder: "สิทธิ์การใช้งาน",
    name: "Level",
    options: projectBudgetOptions,
    col: "2",
  },
];
