import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import IconButton from "../IconButton";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray400: "#cccccc",
    gray700: "#333333",
    transparent: "transparent",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

describe("IconButton", () => {
  it("renders icon with correct props", () => {
    const { getByTestId } = render(
      <IconButton
        icon="chevron-left-icon"
        onPress={() => {}}
        testID="icon-button"
      />,
    );
    expect(getByTestId("icon-button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IconButton
        icon="chevron-left-icon"
        onPress={onPressMock}
        testID="pressable-icon"
      />,
    );
    fireEvent.press(getByTestId("pressable-icon"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("shows badge when badgeCount > 0", () => {
    const { getByText } = render(
      <IconButton icon="chevron-right-icon" badgeCount={3} onPress={() => {}} />,
    );
    expect(getByText("3")).toBeTruthy();
  });

  it("does not show badge when badgeCount is 0", () => {
    const { queryByText } = render(
      <IconButton icon="chevron-right-icon" badgeCount={0} onPress={() => {}} />,
    );
    expect(queryByText(/Badge:/)).toBeNull();
  });
});
