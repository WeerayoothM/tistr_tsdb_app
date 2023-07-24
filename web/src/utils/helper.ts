import { get, isString } from "lodash";

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const handleChangeInput = (
  e: any,
  key: string = "",
  type: string = "",
  formData: any,
  setFormData: any
) => {
  const value = isString(e) ? e : e.target.value;
  const name = isString(e) ? key : e.target.name;

  if (type === "checkbox") {
    const oldValue = get(formData, key, []) || [];
    const setValue = oldValue.includes(value.toString())
      ? oldValue.filter((item: string) => item.toString() !== value.toString())
      : [...oldValue, value];
    setFormData({ ...formData, [key]: setValue });
    return;
  }

  setFormData({ ...formData, [name]: value });
};

export const initTasks = (projectData: any) => {
  const currentDate = new Date();
  const actualStart = get(projectData, "actualStartDate")
    ? new Date(get(projectData, "actualStartDate"))
    : "";
  const actualEnd = get(projectData, "actualEndDate")
    ? new Date(get(projectData, "actualEndDate"))
    : "";
  const start = get(projectData, "startDate")
    ? new Date(get(projectData, "startDate"))
    : "";
  const end = get(projectData, "endDate")
    ? new Date(get(projectData, "endDate"))
    : "";
  const approveDate = get(projectData, "approveDate")
    ? new Date(get(projectData, "approveDate"))
    : "";
  const tasks = [
    {
      start: start,
      end: end,
      name: "ร่างโครงการ",
      id: "Task 1",
      type: "task",
      project: "ProjectSample",
    },
    {
      start: approveDate,
      end: approveDate,
      name: "อนุมัติโครงการ",
      id: "Task 2",
      type: "task",
      project: "ProjectSample",
    },
    {
      start: actualStart,
      end: actualEnd,
      name: "ดำเนินการตามแผนโครงการ",
      id: "Task 3",
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "ดำเนินโครงการจัดอบรม ครั้งที่ 1",
      id: "Task 4",
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "ดำเนินโครงการจัดอบรม ครั้งที่ 2",
      id: "Task 5",
      // dependencies: ["Task 4"],
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
      name: "สรุปผลการดำเนินโครงการ",
      id: "Task 6",
      type: "task",
      project: "ProjectSample",
    },
  ];
  return tasks;
};
