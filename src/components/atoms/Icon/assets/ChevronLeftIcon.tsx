import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const ChevronLeftIcon = ({
  fill = "#667085",
  width = 16,
  height = 16,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    testID={testID}
    fill="none"
    {...props}
  >
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M10.232 4.184a.6.6 0 0 1-.016.848L7.066 8l3.15 2.967a.6.6 0 1 1-.832.865l-3.6-3.4a.6.6 0 0 1 0-.865l3.6-3.4a.6.6 0 0 1 .848.017Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default memo(ChevronLeftIcon);
