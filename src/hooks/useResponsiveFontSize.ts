import { useWindowDimensions } from "react-native";

export const useResponsiveFontSize = (size: number): number => {
  const { width } = useWindowDimensions();
  const scale = width / 375;
  const scaledSize = size * scale;
  return Math.round(Math.max(12, Math.min(scaledSize, 30)));
};
