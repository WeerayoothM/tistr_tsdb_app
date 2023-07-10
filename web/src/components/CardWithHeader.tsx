import React from "react";
import { observer } from "mobx-react-lite";
import { isEmpty } from "lodash";

interface Item {
  label: string;
  value: string;
}

interface Props {
  headerColor?: string;
  headerTitle?: string;
  direction?: string;
  data?: Item[];
  unit?: string;
  alignDirection?: string;
}

const CardWithHeader: React.FC<Props> = ({
  headerTitle = "",
  headerColor = "",
  direction = "horizontal",
  data = [],
  unit = "",
  alignDirection = "",
}) => {
  return (
    <div className={`bg-white rounded-[8px] w-full h-full bsd`}>
      {headerTitle && (
        <div
          className={`font-srb-700 text-[17px] text-white rounded-t-[8px] px-[1rem] py-[0.5rem]`}
          style={{ backgroundColor: `${headerColor}` }}
        >
          {headerTitle}
        </div>
      )}

      {!isEmpty(data) && (
        <div className="rounded-b-[8px] h-full p-5">
          {direction === "horizontal" && (
            <div className={`grid grid-cols-${data.length} `}>
              {data.map((item, index) => (
                <div
                  key={`card-${index}`}
                  className={`flex flex-col items-${alignDirection} gap-[10px] px-[1.5rem]`}
                  style={{
                    borderRight:
                      index !== data.length - 1 ? `2px solid #D9D9D9` : ``,
                  }}
                >
                  <div className="font-srb-500 text-[16px] text-[#666666]">
                    {item.label}
                  </div>
                  <div className="text-[24px] font-srb-600">{item.value}</div>
                  <div className="text-[#ADB5BD] text-[16px] font-srb-500">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          )}

          {direction === "vertical" && (
            <div className="flex flex-col w-full gap-[10px]">
              {data.map((item, index) => (
                <div
                  key={`card-${index}`}
                  className={`flex justify-between gap-[10px]`}
                >
                  <div className="font-srb-500 text-[16px] text-[#666666]">
                    {item.label}
                  </div>
                  <div className="text-[24px] font-srb-600">
                    {item.value}
                    <span className="ml-[20px] text-[#ADB5BD] text-[16px] font-srb-500">
                      {unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default observer(CardWithHeader);
