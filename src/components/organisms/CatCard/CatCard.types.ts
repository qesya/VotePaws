import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { ButtonIconGroupItem } from "../../molecules/ButtonIconGroup/ButtonIconGroup";

export type CatCardProps = {
  imageSource: ImageSourcePropType;
  title: string;
  origin: string;
  iconGroupData?: ButtonIconGroupItem[];
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  imageSize?: number;
  iconGroupSpacing?: number;
  iconGroupSize?: number;
  onItemPress: (item: ButtonIconGroupItem) => void;
  onPressRemove?: () => void;
  isRemoveLoading?: boolean;
};
