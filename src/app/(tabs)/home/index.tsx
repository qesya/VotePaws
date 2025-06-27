import { CatDisplayInfo } from "@/src/domain";
import { useGetCatsAPI, useUploadCatMutationAPI } from "@/src/services";
import { transformCatsToDisplayInfo } from "@/src/utils";
import { FlashList } from "@shopify/flash-list";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import HomeView from "./home-view";

const LIMIT = 10;

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<FlashList<CatDisplayInfo>>(null!);
  const { onUploadCatMutationAPI } = useUploadCatMutationAPI();

  const { data, isLoading, isFetching } = useGetCatsAPI({
    size: "thumb",
    mime_types: "jpg",
    format: "json",
    has_breeds: true,
    order: "RANDOM",
    page: currentPage,
    limit: 10,
  });

  const cats = useMemo(() => {
    return data ? transformCatsToDisplayInfo(data) : [];
  }, [data]);

  const totalPages = useMemo(() => {
    if (!data) return 1;
    return data.length < LIMIT ? currentPage : currentPage + 1;
  }, [data, currentPage]);

  const onHandlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onHandleCatDetails = (slug: string) => {
    router.navigate({ pathname: "/cat-details", params: { slug } });
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need permission to access your photos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];

      const formData = new FormData();
      formData.append("file", {
        uri: selectedImage.uri,
        name: selectedImage.fileName ?? "cat.jpg",
        type: selectedImage.type ?? "image/jpeg",
      } as any);

      try {
        const res = await onUploadCatMutationAPI.mutateAsync({
          payload: formData,
        });

        Alert.alert("Success", "Cat uploaded successfully! 🐱");
        router.navigate({ pathname: "/cat-details", params: { slug: res.id } });
      } catch (error) {
        console.error("Upload error", error);
      }
    }
  };

  return (
    <HomeView
      cats={cats}
      currentPage={currentPage}
      isLoading={isLoading || isFetching}
      listRef={listRef}
      onPageChange={onHandlePageChange}
      onPressCatDetails={onHandleCatDetails}
      totalPages={totalPages}
      onPressUpload={handleImagePick}
    />
  );
}
