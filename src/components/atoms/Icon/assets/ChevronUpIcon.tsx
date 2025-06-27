import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const ChevronUpIcon = ({
  fill = "#667085",
  width = 20,
  height = 20,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 20 20"
    testID={testID}
    {...props}
  >
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="m15 12.5-5-5-5 5"
    />
  </Svg>
);

export default memo(ChevronUpIcon);
