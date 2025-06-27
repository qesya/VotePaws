import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const EllipsisIcon = ({
  fill = "#101828",
  width = 17,
  height = 16,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 17 16"
    testID={testID}
    {...props}
  >
    <Path
      fill={fill}
      d="M2.9 8a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0ZM7.3 8a1.2 1.2 0 1 1 2.4 0 1.2 1.2 0 0 1-2.4 0ZM12.9 6.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
    />
  </Svg>
);

export default memo(EllipsisIcon);
