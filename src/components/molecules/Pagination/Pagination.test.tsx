import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Pagination from "../Pagination";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray700: "#333333",
    white: "#ffffff",
  }),
}));

jest.mock("@/src/components/atoms/Button", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ title, onPress, testID = title }: any) => (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

jest.mock("@/src/components/atoms/IconButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ icon, testID = icon, onPress }: any) => (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
});

describe("Pagination", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all pages when totalPages is small", () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(getByText("1")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
  });

  it("renders ellipsis correctly for long pagination", () => {
    const { getByText } = render(
      <Pagination
        currentPage={6}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    expect(getByText("1")).toBeTruthy();
    expect(getByText("6")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
  });

  it("calls onPageChange with correct value on Prev/Next", () => {
    const { getByText } = render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.press(getByText("Prev"));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);

    fireEvent.press(getByText("Next"));
    expect(onPageChangeMock).toHaveBeenCalledWith(6);
  });

  it("disables Prev on first page and Next on last page", () => {
    const { getByText, rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.press(getByText("Prev"));
    expect(onPageChangeMock).toHaveBeenCalled();

    rerender(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.press(getByText("Next"));
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it("calls onPageChange when numbered page is pressed", () => {
    const { getByText } = render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />,
    );

    fireEvent.press(getByText("4"));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
