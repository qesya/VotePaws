import { render } from "@testing-library/react-native";
import React from "react";
import CatImageDetails from "./CatImageDetails";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray100: "#e0e0e0",
    secondaryColor300: "#00bcd4",
  }),
}));

describe("CatImageDetails", () => {
  const mockMedia = [
    { id: "img-1", src: "https://example.com/image1.jpg" },
    { id: "img-2", src: "https://example.com/image2.jpg" },
  ];

  it("renders correct number of thumbnails", () => {
    const { getAllByRole } = render(<CatImageDetails media={mockMedia} />);
    const thumbnails = getAllByRole("button");
    expect(thumbnails).toHaveLength(mockMedia.length);
  });
});
