import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "VotePaws",
  slug: "VotePaws",
  scheme: "VotePaws",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/app-icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    catAPIKey: process.env.CAT_API_KEY,
    storybookMode: process.env.STORYBOOK_MODE,
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "co.waracle.app",
  },

  android: {
    package: "com.warcle.app",
    edgeToEdgeEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/app-icon.png",
      backgroundColor: "#ffffff",
    },
  },

  web: {
    bundler: "metro",
    output: "static",
    favicon: "./src/assets/images/app-icon.png",
  },

  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
      },
    ],
    [
      "expo-router",
      {
        origin: process.env.EXPO_PUBLIC_BASE_URL,
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./src/assets/images/votepaws.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./src/assets/fonts/Inter_ExtraLight.ttf",
          "./src/assets/fonts/Inter_Light.ttf",
          "./src/assets/fonts/Inter_Regular.ttf",
          "./src/assets/fonts/Inter_Medium.ttf",
          "./src/assets/fonts/Inter_SemiBold.ttf",
          "./src/assets/fonts/Inter_Bold.ttf",
        ],
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },
});
