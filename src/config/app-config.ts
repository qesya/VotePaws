import Constants from "expo-constants";

export const APP_CONFIG = {
  BASE_URL: Constants?.expoConfig?.extra?.baseURL ?? "",
  CAT_API_KEY: Constants?.expoConfig?.extra?.catAPIKey ?? "",
  STORYBOOK_MODE: Constants?.expoConfig?.extra?.storybookMode ?? "",
};
