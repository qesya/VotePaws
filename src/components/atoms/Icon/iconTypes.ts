import { SvgProps } from "react-native-svg";

export interface IIconProps extends SvgProps {
  width?: number;
  height?: number;
  fill?: string;
  testID?: string;
}
