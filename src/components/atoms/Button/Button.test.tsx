import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Button from "../Button";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    primaryColor400: "#1a73e8",
    primaryColor500: "#1669c1",
    gray50: "#f9f9f9",
    gray100: "#f1f1f1",
    gray200: "#e2e2e2",
    gray300: "#d1d1d1",
    gray700: "#333333",
    error500: "#e53935",
    error600: "#d32f2f",
    error200: "#ef9a9a",
    error100: "#ffcdd2",
    white: "#ffffff",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

describe("Button", () => {
  it("renders button title", () => {
    const { getByText } = render(
      <Button title="Click Me" type="primary" onPress={() => {}} />,
    );
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("triggers onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Submit"
        type="primary"
        onPress={onPressMock}
        testId="button"
      />,
    );
    fireEvent.press(getByTestId("button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        title="Disabled"
        type="primary"
        isDisabled
        onPress={onPressMock}
        testId="disabled-button"
      />,
    );
    fireEvent.press(getByTestId("disabled-button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("shows loader when isLoading is true", () => {
    const { getByTestId, queryByText } = render(
      <Button
        title="Load"
        type="primary"
        isLoading
        onPress={() => {}}
        testId="loading-button"
      />,
    );
    expect(getByTestId("activity-indicator")).toBeTruthy();
    expect(queryByText("Load")).toBeNull();
  });

  it("renders left icon when provided", () => {
    const { toJSON } = render(
      <Button
        title="With Icon"
        type="primary"
        icon="chevron-left-icon"
        iconPosition="left"
        onPress={() => {}}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders right icon when provided", () => {
    const { toJSON } = render(
      <Button
        title="With Icon"
        type="primary"
        icon="chevron-left-icon"
        iconPosition="right"
        onPress={() => {}}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
