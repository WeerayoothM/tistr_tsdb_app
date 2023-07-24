import React from "react";
import { Platform } from "react-native";
import { SvgXml } from "react-native-svg";

const XIconProfile = ({ color, ...props }) => {
  if (Platform.OS === "web") {
    return <></>;
  }
  return (
    <SvgXml
      xml={`<svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.17 17.5725C17.0571 17.5588 16.9429 17.5588 16.83 17.5725C15.6286 17.5333 14.4899 17.0423 13.6546 16.2033C12.8193 15.3643 12.3526 14.243 12.3533 13.0763C12.3533 10.5875 14.4217 8.56629 17 8.56629C18.2175 8.56424 19.3871 9.02665 20.2567 9.85384C21.1262 10.681 21.626 11.8067 21.6483 12.9883C21.6706 14.1698 21.2136 15.3125 20.3759 16.1701C19.5382 17.0276 18.3868 17.5313 17.17 17.5725ZM26.5483 26.6475C23.9449 28.97 20.536 30.2561 17 30.25C13.3167 30.25 9.97333 28.8888 7.45166 26.6475C7.59333 25.355 8.44333 24.09 9.95916 23.1C13.8408 20.5975 20.1875 20.5975 24.0408 23.1C25.5567 24.09 26.4067 25.355 26.5483 26.6475Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 30.25C24.8243 30.25 31.1667 24.0941 31.1667 16.5C31.1667 8.90588 24.8243 2.75 17 2.75C9.17579 2.75 2.83337 8.90588 2.83337 16.5C2.83337 24.0941 9.17579 30.25 17 30.25Z" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      {...props}
    />
  );
};

export default XIconProfile;
