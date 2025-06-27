import { useFavoriteMutationAPI, useGetFavoritesAPI } from "@/src/services";
import { transformFavorites } from "@/src/utils/transformFavorites";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert } from "react-native";
import FavoritesView from "./favorites-view";

export default function FavoritesScreen() {
  const { data, isLoading } = useGetFavoritesAPI();
  const { onUnfavoriteMutationAPI } = useFavoriteMutationAPI();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const transformedFavorites = useMemo(() => transformFavorites(data), [data]);

  const onPressCatDetails = (slug: string) => {
    router.navigate({ pathname: "/cat-details", params: { slug } });
  };

  const handleRemoveConfirmed = async (favoriteId: string) => {
    try {
      setRemovingId(favoriteId);
      await onUnfavoriteMutationAPI.mutateAsync({ favoriteId });
      Alert.alert("Removed", "The cat has been removed from your favorites.");
      setRemovingId(null);
    } catch (error) {
      setRemovingId(null);
      console.log("error", error);
    }
  };

  const onHandleRemoveFromFav = (favoriteId: string) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this cat?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            handleRemoveConfirmed(favoriteId);
          },
        },
      ],
    );
  };

  const onHandleGoBack = () => {
    router.back();
  };

  return (
    <FavoritesView
      favCats={transformedFavorites}
      isLoading={isLoading}
      onPressCatDetails={onPressCatDetails}
      onPressRemoveFromFav={onHandleRemoveFromFav}
      removingId={removingId}
      isRemoveLoading={onUnfavoriteMutationAPI.isPending}
      onPressGoBack={onHandleGoBack}
    />
  );
}
