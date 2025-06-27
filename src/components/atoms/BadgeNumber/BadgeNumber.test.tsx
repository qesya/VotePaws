import { render } from "@testing-library/react-native";
import React from "react";
import BadgeNumber from "./BadgeNumber";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    secondaryColor400: "#CCCCCC",
    primaryColor400: "#333333",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

describe("BadgeNumber", () => {
  it("renders correctly with a number", () => {
    const { getByText } = render(<BadgeNumber number={5} />);
    const numberText = getByText("5");
    expect(numberText).toBeTruthy();
  });

  it("renders correctly with a string", () => {
    const { getByText } = render(<BadgeNumber number="99+" />);
    const numberText = getByText("99+");
    expect(numberText).toBeTruthy();
  });

  it("applies custom background and text color", () => {
    const { getByText } = render(
      <BadgeNumber
        number={1}
        backgroundColor="#FF0000"
        textColor="#00FF00"
        containerStyle={{ margin: 10 }}
      />,
    );

    const numberText = getByText("1");
    expect(numberText.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "#00FF00" }),
        expect.objectContaining({ fontSize: 8 }),
      ]),
    );
  });

  it("uses default colors from useColors when not provided", () => {
    const { getByText } = render(<BadgeNumber number="A" />);
    const numberText = getByText("A");

    expect(numberText.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "#333333" })]),
    );
  });
});
