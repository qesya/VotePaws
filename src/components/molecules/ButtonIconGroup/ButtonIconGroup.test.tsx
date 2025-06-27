import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ButtonIconGroup from "../ButtonIconGroup";
import { ButtonIconGroupItem } from "./ButtonIconGroup";

jest.mock("@/src/components/atoms/IconButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ icon, onPress, testID }: any) => (
    <TouchableOpacity testID={testID ?? icon} onPress={onPress}>
      <Text>{`Icon: ${icon}`}</Text>
    </TouchableOpacity>
  );
});

describe("ButtonIconGroup", () => {
  const mockData: ButtonIconGroupItem[] = [
    {
      id: "1",
      icon: "chevron-left-icon",
      isActive: false,
      iconColor: "#999999",
    },
    {
      id: "2",
      icon: "chevron-left-icon",
      activeIcon: "chevron-left-icon",
      isActive: true,
      iconColor: "#999999",
      activeIconColor: "#000000",
    },
  ];

  it("renders all icons", () => {
    const { getByTestId } = render(<ButtonIconGroup data={mockData} />);
    expect(getByTestId("icon-button-1")).toBeTruthy();
    expect(getByTestId("icon-button-2")).toBeTruthy();
  });

  it("calls onItemPress with correct item", () => {
    const onItemPressMock = jest.fn();
    const { getByTestId } = render(
      <ButtonIconGroup data={mockData} onItemPress={onItemPressMock} />,
    );

    fireEvent.press(getByTestId("icon-button-1"));
    expect(onItemPressMock).toHaveBeenCalledWith(mockData[0]);

    fireEvent.press(getByTestId("icon-button-2"));
    expect(onItemPressMock).toHaveBeenCalledWith(mockData[1]);
  });

  it("renders with custom spacing and size", () => {
    const { getByTestId } = render(
      <ButtonIconGroup data={mockData} spacing={16} size={32} />,
    );

    expect(getByTestId("icon-button-1")).toBeTruthy();
    expect(getByTestId("icon-button-2")).toBeTruthy();
  });
});
