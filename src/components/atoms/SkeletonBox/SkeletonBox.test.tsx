import { render } from "@testing-library/react-native";
import React from "react";
import SkeletonBox from "../SkeletonBox";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  Reanimated.useSharedValue = (initial = 0) => ({ value: initial });

  Reanimated.withRepeat = (animation: any) => animation;
  Reanimated.withTiming = (value: any, config: any) => value;
  Reanimated.Easing = {
    inOut: jest.fn((fn) => fn),
    ease: jest.fn(),
  };

  return Reanimated;
});

describe("SkeletonBox", () => {
  it("renders with given height and default width", () => {
    const { getByTestId } = render(<SkeletonBox height={50} />);

    const container = getByTestId("skeleton-container");
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          height: 50,
          width: "100%",
        }),
      ]),
    );
  });

  it("accepts custom width and additional style", () => {
    const { getByTestId } = render(
      <SkeletonBox height={40} width={120} style={{ marginTop: 10 }} />,
    );

    const container = getByTestId("skeleton-container");

    const flatStyle = Array.isArray(container.props.style)
      ? Object.assign({}, ...container.props.style)
      : container.props.style;

    expect(flatStyle.width).toBe(120);
    expect(flatStyle.marginTop).toBe(10);
    expect(flatStyle.height).toBe(40);
  });

  it("renders shimmer animation view", () => {
    const { UNSAFE_getAllByType } = render(<SkeletonBox height={60} />);
    const shimmerViews = UNSAFE_getAllByType(
      require("react-native-reanimated").default.View,
    );

    expect(shimmerViews.length).toBeGreaterThan(0);
  });
});
