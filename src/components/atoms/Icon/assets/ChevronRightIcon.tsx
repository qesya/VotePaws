import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const ChevronRightIcon = ({
  fill = "#667085",
  width = 16,
  height = 16,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 16 16"
    testID={testID}
    {...props}
  >
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M5.767 11.816a.6.6 0 0 1 .017-.849L8.934 8l-3.15-2.968a.6.6 0 0 1 .832-.864l3.6 3.4a.6.6 0 0 1 0 .864l-3.6 3.4a.6.6 0 0 1-.849-.016Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default memo(ChevronRightIcon);
