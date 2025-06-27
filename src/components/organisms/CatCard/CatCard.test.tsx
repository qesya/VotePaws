import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import CatCard from "./CatCard";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray700: "#333333",
    warning500: "#FF9900",
  }),
}));

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity, View } = require("react-native");

  return {
    Typography: ({ children, ...props }: any) => <Text {...props}>{children}</Text>,
    PressableButton: ({ onPress, children, testID = "product-card", style }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID} style={style}>
        {children}
      </TouchableOpacity>
    ),
    ButtonIconGroup: ({ data, onItemPress }: any) => (
      <View testID="icon-group">
        {data.map((item: any, index: number) => (
          <TouchableOpacity key={index} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    Button: ({ onPress, title }: any) => (
      <TouchableOpacity onPress={onPress} testID="remove-button">
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("CatCard", () => {
  const baseProps: any = {
    imageSource: { uri: "https://example.com/cat.jpg" },
    title: "Cute Cat",
    origin: "Indonesia",
    onPress: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and origin", () => {
    const { getByText } = render(<CatCard {...baseProps} />);
    expect(getByText("Cute Cat")).toBeTruthy();
    expect(getByText("Indonesia")).toBeTruthy();
  });

  it("triggers onPress when card is pressed", () => {
    const { getByTestId } = render(<CatCard {...baseProps} />);
    fireEvent.press(getByTestId("product-card"));
    expect(baseProps.onPress).toHaveBeenCalled();
  });

  it("renders image with correct source", () => {
    const { UNSAFE_getAllByType } = render(<CatCard {...baseProps} />);
    const images = UNSAFE_getAllByType(require("react-native").Image);
    expect(images.length).toBeGreaterThan(0);
    expect(images[0].props.source).toEqual(baseProps.imageSource);
  });

  it("renders remove button when onPressRemove is provided", () => {
    const mockRemove = jest.fn();
    const { getByTestId, getByText } = render(
      <CatCard {...baseProps} onPressRemove={mockRemove} />
    );
    fireEvent.press(getByTestId("remove-button"));
    expect(mockRemove).toHaveBeenCalled();
    expect(getByText("Remove")).toBeTruthy();
  });

  it("shows ActivityIndicator when isRemoveLoading is true", () => {
    const { UNSAFE_getByType } = render(
      <CatCard {...baseProps} onPressRemove={() => {}} isRemoveLoading />
    );
    expect(UNSAFE_getByType(require("react-native").ActivityIndicator)).toBeTruthy();
  });

  it("renders icon group when data is provided", () => {
    const iconGroupData = [
      { id: 1, label: "Like" },
      { id: 2, label: "Favorite" },
    ];

    const onItemPress = jest.fn();
    const { getByText } = render(
      <CatCard {...baseProps} iconGroupData={iconGroupData} onItemPress={onItemPress} />
    );

    const likeBtn = getByText("Like");
    fireEvent.press(likeBtn);
    expect(onItemPress).toHaveBeenCalledWith({ id: 1, label: "Like" });
  });
});
