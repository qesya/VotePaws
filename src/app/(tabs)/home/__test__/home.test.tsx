import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import HomeScreen from "../index";

jest.mock("expo-router", () => ({
    router: {
        navigate: jest.fn(),
    },
}));

jest.mock("@/src/services", () => ({
    useGetCatsAPI: () => ({
        data: [
            {
                id: "cat-1",
                url: "https://cat-1.jpg",
                name: "Cute Cat",
                origin: "Japan",
            },
        ],
        isLoading: false,
        isFetching: false,
    }),
    useUploadCatMutationAPI: () => ({
        onUploadCatMutationAPI: {
            mutateAsync: jest.fn().mockResolvedValue({ id: "cat-999" }),
        },
    }),
}));

jest.mock("expo-image-picker", () => ({
    requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: "granted" }),
    launchImageLibraryAsync: jest.fn().mockResolvedValue({
        canceled: false,
        assets: [
            {
                uri: "file://test.jpg",
                fileName: "test.jpg",
                type: "image/jpeg",
            },
        ],
    }),
    MediaTypeOptions: {
        Images: "Images",
    },
}));

jest.mock("@/src/utils", () => ({
    transformCatsToDisplayInfo: (data: any) => data,
}));

jest.mock("../home-view", () => {
    const { TouchableOpacity, Text } = require("react-native");
    return ({
        onPressUpload,
        onPressCatDetails,
    }: {
        onPressUpload: () => void;
        onPressCatDetails: (slug: string) => void;
    }) => (
        <>
            <TouchableOpacity testID="upload-button" onPress={onPressUpload}>
                <Text>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity testID="cat-card" onPress={() => onPressCatDetails("cat-1")}>
                <Text>Cat Card</Text>
            </TouchableOpacity>
        </>
    );
});

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("HomeScreen", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("uploads image and shows success alert", async () => {
        const { getByTestId } = render(<HomeScreen />);

        fireEvent.press(getByTestId("upload-button"));

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith("Success", "Cat uploaded successfully! 🐱");
        });
    });

    it("navigates to cat details when a cat card is pressed", () => {
        const { getByTestId } = render(<HomeScreen />);
        fireEvent.press(getByTestId("cat-card"));

        const { router } = require("expo-router");
        expect(router.navigate).toHaveBeenCalledWith({
            pathname: "/cat-details",
            params: { slug: "cat-1" },
        });
    });

    it("shows alert when permission is denied", async () => {
        const ImagePicker = require("expo-image-picker");
        ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({
            status: "denied",
        });

        const { getByTestId } = render(<HomeScreen />);
        fireEvent.press(getByTestId("upload-button"));

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                "Permission required",
                "We need permission to access your photos.",
            );
        });
    });
});
