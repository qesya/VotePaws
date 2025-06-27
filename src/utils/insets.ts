import { Platform } from "react-native";

export const HARD_CODED_SAFE_AREA = {
  top: Platform.OS === "ios" ? 44 : 36,
  bottom: Platform.OS === "ios" ? 34 : 36,
};

export const getAppSafeAreaInset = () => {
  return {
    top: HARD_CODED_SAFE_AREA.top,
    bottom: HARD_CODED_SAFE_AREA.bottom,
  };
};

export const insetBottomAndroidOnly =
  Platform.OS === "android" ? HARD_CODED_SAFE_AREA.bottom : 0;
export const insetTopAndroidOnly =
  Platform.OS === "android" ? HARD_CODED_SAFE_AREA.top : 0;
