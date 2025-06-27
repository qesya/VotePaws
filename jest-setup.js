jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
    back: jest.fn(),
    useLocalSearchParams: jest.fn(() => ({})),
  },
}));

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({ top: 0, bottom: 20, left: 0, right: 0 }),
}));

jest.mock("react-native-gesture-handler", () => {
  const actual = jest.requireActual("react-native-gesture-handler");
  return {
    ...actual,
    GestureHandlerRootView: jest
      .fn()
      .mockImplementation(({ children }) => children),
    GestureDetector: jest.fn().mockImplementation(({ children }) => children),
  };
});
