import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
  title: string;
  cn?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <div>
      <button
        className={`${props.cn} relative cursor-pointer border-none rounded-[8px] px-[50px] h-[60px] text-[18px] lg:text-[24px] text-center font-lineBd min-w-[200px]`}
        type={props.type || "submit"}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </div>
  );
};

export default observer(Button);
