import { StyleProp, ViewStyle } from "react-native";

export type CatImageDetailsMedia = {
  id: string | number;
  src: string;
};

export type CatImageDetailsProps = {
  media: CatImageDetailsMedia[];
  style?: StyleProp<ViewStyle>;
};
