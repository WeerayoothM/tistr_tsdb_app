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

export const initTasks = () => {
  const currentDate = new Date();
  const tasks = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "ร่างโครงการ",
      id: "Task 1",
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "อนุมัติโครงการ",
      id: "Task 2",
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
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
