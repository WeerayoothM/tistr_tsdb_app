export const projectStatusOptions = [
  {
    label: "-- เลือกสถานะโครงการ --",
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
    label: "-- เลือกกลุ่มงาน --",
    value: "",
  },
  {
    label: "กลุ่มงาน1",
    value: "กลุ่มงาน1",
  },
];

export const projectBudgetOptions = [
  {
    label: "-- เลือกงบประมาณ --",
    value: "",
  },
  {
    label: "งบประมาณ1",
    value: "งบประมาณ1",
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
