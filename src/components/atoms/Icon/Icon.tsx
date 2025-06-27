import React, { memo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import ChevronLeftIcon from "./assets/ChevronLeftIcon";
import ChevronRightIcon from "./assets/ChevronRightIcon";
import ChevronUpIcon from "./assets/ChevronUpIcon";
import EllipsisIcon from "./assets/EllipsisIcon";
import HeartIcon from "./assets/HeartIcon";
import HeartSolidIcon from "./assets/HeartSolidIcon";
import PlusIcon from "./assets/PlusIcon";
import UserIcon from "./assets/UserIcon";
import XIcon from "./assets/XIcon";
import { IIconProps } from "./iconTypes";

export const BUTTON_ICON_TYPES = {
  "heart-icon": HeartIcon,
  "user-icon": UserIcon,
  "chevron-up-icon": ChevronUpIcon,
  "chevron-left-icon": ChevronLeftIcon,
  "chevron-right-icon": ChevronRightIcon,
  "x-icon": XIcon,
  "heart-solid-icon": HeartSolidIcon,
  "plus-icon": PlusIcon,
  "ellipsis-icon": EllipsisIcon,
};

export type IconProps = IIconProps & {
  icon: keyof typeof BUTTON_ICON_TYPES;
  style?: StyleProp<ViewStyle>;
};

const Icon: React.FC<IconProps> = ({
  height = 24,
  width = 24,
  fill,
  icon,
  testID,
  style,
}) => {
  const IconComponent = BUTTON_ICON_TYPES[icon];

  if (!IconComponent) {
    console.error(`❌ Icon "${icon}" not found in BUTTON_ICON_TYPES`);
    return null;
  }

  return (
    <IconComponent
      width={width}
      height={height}
      fill={fill}
      testID={testID}
      style={style}
    />
  );
};

export default memo(Icon);
