import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Image } from "react-native";
import HeaderMenu from "./HeaderMenu";

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    IconButton: ({ icon, onPress, badgeCount }: any) => (
      <TouchableOpacity onPress={onPress} testID={`icon-${icon}`}>
        <Text>{icon}</Text>
        {badgeCount !== undefined && (
          <Text testID="badge-count">{badgeCount}</Text>
        )}
      </TouchableOpacity>
    ),
  };
});

describe("HeaderMenu", () => {
  const defaultLogo = require("../../../assets/images/votepaws.png");

  it("renders with default logo", () => {
    const { UNSAFE_getByType } = render(<HeaderMenu />);
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual(defaultLogo);
  });

  it("renders with custom image source", () => {
    const customSource = { uri: "https://example.com/cat.png" };
    const { UNSAFE_getByType } = render(
      <HeaderMenu imageSource={customSource} />
    );
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual(customSource);
  });

  it("calls onPressBack when back button is pressed", () => {
    const onPressBack = jest.fn();
    const { getByTestId } = render(<HeaderMenu onPressBack={onPressBack} />);
    const backBtn = getByTestId("icon-chevron-left-icon");
    fireEvent.press(backBtn);
    expect(onPressBack).toHaveBeenCalled();
  });

  it("calls onFavPress when heart button is pressed", () => {
    const onFavPress = jest.fn();
    const { getByTestId } = render(<HeaderMenu onFavPress={onFavPress} />);
    const favBtn = getByTestId("icon-heart-icon");
    fireEvent.press(favBtn);
    expect(onFavPress).toHaveBeenCalled();
  });

  it("displays badge count when provided", () => {
    const { getByTestId } = render(
      <HeaderMenu onFavPress={() => {}} badgeCount={99} />
    );
    const badge = getByTestId("badge-count");
    expect(badge.props.children).toBe(99);
  });

  it("does not render IconButton if no handlers are provided", () => {
    const { queryByTestId } = render(<HeaderMenu />);
    expect(queryByTestId("icon-chevron-left-icon")).toBeNull();
    expect(queryByTestId("icon-heart-icon")).toBeNull();
  });
});
