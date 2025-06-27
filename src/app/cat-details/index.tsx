import {
  useFavoriteMutationAPI,
  useGetCatDetailsAPI,
  useGetFavoritesAPI,
} from "@/src/services";
import { transformCatDetails } from "@/src/utils/transformCatDetails";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Alert } from "react-native";
import CatDetailsView from "./cat-details-view";

export default function ProductDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();

  const { data, isLoading } = useGetCatDetailsAPI(slug ?? "");
  const { onFavoriteMutationAPI } = useFavoriteMutationAPI();
  const { data: favData } = useGetFavoritesAPI();

  const transformedData = useMemo(() => transformCatDetails(data), [data]);

  const badgeCount = favData?.length ?? 0;

  const handlers = {
    onPressGoBack: () => router.back(),

    onPressGoToFav: () => router.navigate("/favorites"),

    onFavoritePress: async () => {
      if (!slug) return;

      try {
        const res = await onFavoriteMutationAPI.mutateAsync({
          payload: { image_id: slug, sub_id: "my-user-27052025" },
        });

        if (res.message === "SUCCESS") {
          Alert.alert("Success", "Cat added to favorites.");
        } else {
          Alert.alert("Error", "Failed to add to favorites.");
        }
      } catch (err) {
        console.error("Favorite mutation failed:", err);
      }
    },
  };

  return (
    <CatDetailsView
      isLoading={isLoading}
      badgeCount={badgeCount}
      media={transformedData.media}
      title={transformedData.title}
      origin={transformedData.origin}
      description={transformedData.description}
      temperament={transformedData.temperament}
      lifeSpan={transformedData.lifeSpan}
      wikipediaUrl={transformedData.wikipediaUrl}
      onFavoritePress={handlers.onFavoritePress}
      onPressGoBack={handlers.onPressGoBack}
      onPressGoToFav={handlers.onPressGoToFav}
      isAddToFavLoading={onFavoriteMutationAPI.isPending}
    />
  );
}
