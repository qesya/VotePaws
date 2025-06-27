import { render } from "@testing-library/react-native";
import React from "react";
import Typography from "../Typography";

jest.mock("@/src/hooks", () => ({
  useResponsiveFontSize: (size: number) => size,
}));

jest.mock("@/src/theme", () => ({
  FONT_SIZES: {
    textBase: 16,
    textSM: 14,
    textXS: 12,
  },
  FONT_FAMILIES: {
    inter: {
      regular: "Inter-Regular",
      medium: "Inter-Medium",
      semiBold: "Inter-SemiBold",
      bold: "Inter-Bold",
    },
    roboto: {
      regular: "Roboto-Regular",
    },
  },
  INTER_FONT_WEIGHTS: {
    regular: "regular",
    medium: "medium",
    semiBold: "semiBold",
    bold: "bold",
  },
}));

describe("Typography", () => {
  it("renders the children text", () => {
    const { getByText } = render(<Typography>Test Text</Typography>);
    expect(getByText("Test Text")).toBeTruthy();
  });

  it("applies default font size, font family, and weight", () => {
    const { getByText } = render(<Typography>Default Styling</Typography>);
    const textElement = getByText("Default Styling");

    const flatStyle = Array.isArray(textElement.props.style)
      ? Object.assign({}, ...textElement.props.style)
      : textElement.props.style;

    expect(flatStyle.fontSize).toBe(16); // textBase
    expect(flatStyle.fontFamily).toBe("Inter-Regular");
    expect(flatStyle.lineHeight).toBeCloseTo(20); // 16 * 1.25
  });

  it("applies provided font size and weight", () => {
    const { getByText } = render(
      <Typography size="textSM" weight="semiBold">
        Styled Text
      </Typography>,
    );
    const textElement = getByText("Styled Text");

    const flatStyle = Array.isArray(textElement.props.style)
      ? Object.assign({}, ...textElement.props.style)
      : textElement.props.style;

    expect(flatStyle.fontSize).toBe(14);
    expect(flatStyle.fontFamily).toBe("Inter-SemiBold");
    expect(flatStyle.lineHeight).toBeCloseTo(17.5);
  });

  it("applies custom color and text alignment", () => {
    const { getByText } = render(
      <Typography color="#ff0000" centerText>
        Colored Centered
      </Typography>,
    );
    const textElement = getByText("Colored Centered");

    const flatStyle = Array.isArray(textElement.props.style)
      ? Object.assign({}, ...textElement.props.style)
      : textElement.props.style;

    expect(flatStyle.color).toBe("#ff0000");
    expect(flatStyle.textAlign).toBe("center");
  });

  it("applies custom style prop", () => {
    const { getByText } = render(
      <Typography style={{ marginTop: 10 }}>With Margin</Typography>,
    );
    const textElement = getByText("With Margin");

    const flatStyle = Array.isArray(textElement.props.style)
      ? Object.assign({}, ...textElement.props.style)
      : textElement.props.style;

    expect(flatStyle.marginTop).toBe(10);
  });
});
