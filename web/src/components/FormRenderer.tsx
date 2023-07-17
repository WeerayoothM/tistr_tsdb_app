import React from "react";
import { observer } from "mobx-react-lite";
import Select from "./Select";

interface Props {
  options?: any[];
  label: string;
  name: string;
  type: string;
  value: any;
  handleChangeInput: any;
  placeholder: string;
  col: number;
}

const FormRenderer: React.FC<Props> = ({
  type,
  options,
  label,
  name,
  value,
  handleChangeInput,
  placeholder,
  col,
}) => {
  return (
    <div className={`w-full col-span-${col}`}>
      <div className="text-[16px] text-[#666666] font-srb-400 mb-[10px] pl-[1rem]">
        {label}
      </div>
      <div className="w-full relative">
        {type === "text" && (
          <>
            <input
              type="text"
              name={name}
              value={value || ""}
              placeholder={placeholder}
              onChange={(e) => handleChangeInput(e)}
              className="outline-none text-[#666666] font-srb-400 placeholder:text-[#ADB5BD] border-none bg-white rounded-[11px] px-[1rem] py-[1.25rem] w-full text-[16px]"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <img src="/images/project-input-search.png" alt="" />
            </div>
          </>
        )}

        {type === "select" && (
          <Select
            value={value || ""}
            option={options}
            onChange={handleChangeInput}
            name={name}
          />
        )}
      </div>
    </div>
  );
};

export default observer(FormRenderer);
