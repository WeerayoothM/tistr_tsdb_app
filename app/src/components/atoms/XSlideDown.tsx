import React from "react";
import Collapsible from "react-native-collapsible";

interface Props {
  active: boolean;
  children: JSX.Element | JSX.Element[];
  duration?: number;
}

const XSlideDown = ({ active, children, duration = 300 }: Props) => {
  return (
    <Collapsible duration={duration} collapsed={!active}>
      {children}
    </Collapsible>
  );
};

export default XSlideDown;
