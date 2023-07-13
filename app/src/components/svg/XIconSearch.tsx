import React from "react";
import { SvgXml } from "react-native-svg";

const XIconSearch = ({ color, ...props }) => {
  return (
    <SvgXml
      xml={`<svg width="26" height="26" viewBox="0 0 26 26" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="Group 181">
                  <circle id="Ellipse 28" cx="10.5" cy="10.5" r="9.75" stroke="${color}" stroke-width="1.5"/>
                  <path id="Line 20" d="M20 20L25 25" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
              </g>
          </svg>
          `}
      {...props}
    />
  );
};

export default XIconSearch;
