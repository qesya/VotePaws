import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const HeartSolidIcon = ({
  fill = "#FFCA4E",
  width = 24,
  height = 24,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    testID={testID}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill={fill}
      d="m11.184 20.698-.007-.003-.022-.012-.08-.043a24.894 24.894 0 0 1-1.315-.775 26.439 26.439 0 0 1-3.098-2.281C4.453 15.68 2 12.823 2 9.4a5.4 5.4 0 0 1 9.6-3.394A5.4 5.4 0 0 1 21.2 9.4c0 3.423-2.453 6.28-4.662 8.184a26.436 26.436 0 0 1-4.413 3.056l-.08.043-.022.012-.007.003h-.002a.886.886 0 0 1-.828.001l-.002-.001Z"
    />
  </Svg>
);

export default memo(HeartSolidIcon);
