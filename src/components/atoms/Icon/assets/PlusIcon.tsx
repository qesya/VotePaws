import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const PlusIcon = ({
  fill = "#000",
  width = 24,
  height = 24,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 206 206"
    fill="none"
    {...props}
  >
    <Path
      fill={fill}
      d="M192.6 90.2h-76.8V13.4c0-7.04-5.76-12.8-12.8-12.8-7.04 0-12.8 5.76-12.8 12.8v76.8H13.4C6.36 90.2.6 95.96.6 103c0 7.04 5.76 12.8 12.8 12.8h76.8v76.8c0 7.04 5.76 12.8 12.8 12.8 7.04 0 12.8-5.76 12.8-12.8v-76.8h76.8c7.04 0 12.8-5.76 12.8-12.8 0-7.04-5.76-12.8-12.8-12.8Z"
    />
  </Svg>
);

export default memo(PlusIcon);
