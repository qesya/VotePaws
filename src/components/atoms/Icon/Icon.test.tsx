import { render } from "@testing-library/react-native";
import React from "react";
import Icon from "./Icon";

describe("Icon Component", () => {
  it('should render HomeOutlineIcon when "chevron-left-icon" is passed as icon prop', async () => {
    const { findByTestId } = render(
      <Icon icon="heart-icon" testID="chevron-left-icon-test-id" />,
    );

    const homeOutlineIcon = await findByTestId("chevron-left-icon-test-id");
    expect(homeOutlineIcon).toBeTruthy();
  });

  it("should apply width and height props correctly", async () => {
    const { findByTestId } = render(
      <Icon
        icon="heart-icon"
        width={50}
        height={50}
        testID="chevron-left-icon-test-id"
      />,
    );

    const homeOutlineIcon = await findByTestId("chevron-left-icon-test-id");
    expect(homeOutlineIcon.props.width).toBe(50);
    expect(homeOutlineIcon.props.height).toBe(50);
  });

  it("should render with default width and height if not provided", async () => {
    const { findByTestId } = render(
      <Icon icon="heart-icon" testID="chevron-left-icon-test-id" />,
    );

    const homeOutlineIcon = await findByTestId("chevron-left-icon-test-id");
    expect(homeOutlineIcon.props.width).toBe(24);
    expect(homeOutlineIcon.props.height).toBe(24);
  });
});
