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
