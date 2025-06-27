import { CatCard, HeaderMenu, Typography } from "@/src/components";
import CatCardSkeleton from "@/src/components/organisms/CatCard/CatCard.skeleton";
import { FavoriteCatInfo } from "@/src/domain";
import { useColors } from "@/src/hooks";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type FavoritesViewProps = {
  favCats: FavoriteCatInfo[];
  onPressCatDetails: (slug: string) => void;
  isLoading: boolean;
  onPressRemoveFromFav: (id: string) => void;
  removingId?: string | null;
  isRemoveLoading?: boolean;
  onPressGoBack: () => void;
};

export default function FavoritesView({
  favCats,
  onPressCatDetails,
  isLoading,
  onPressRemoveFromFav,
  removingId,
  isRemoveLoading,
  onPressGoBack,
}: Readonly<FavoritesViewProps>) {
  const { white, gray500 } = useColors();
  const inset = useSafeAreaInsets();

  const displayData: FavoriteCatInfo[] = isLoading
    ? Array.from({ length: 12 }).map((_, i) => ({
        id: `skeleton-${i}`,
        image: { id: "", url: "" },
        favoritedAt: "",
        favoriteId: `skeleton-${i}`,
      }))
    : favCats;

  const showEmptyState = !isLoading && favCats.length === 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.stickyHeader,
          { paddingTop: inset.top, backgroundColor: white },
        ]}
      >
        <HeaderMenu onPressBack={onPressGoBack} />
      </View>

      {showEmptyState ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/app-icon.png")}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Typography
            size="textSM"
            color={gray500}
            weight="semiBold"
            style={styles.emptyText}
          >
            No favorite cats yet.
          </Typography>
        </View>
      ) : (
        <FlashList<FavoriteCatInfo>
          data={displayData}
          estimatedItemSize={200}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={{ height: Platform.OS === "ios" ? 132 : 116 }} />
          }
          renderItem={({ item, index }) =>
            isLoading ? (
              <CatCardSkeleton key={`skeleton-${index}`} />
            ) : (
              <CatCard
                cardStyle={styles.card}
                style={styles.cardSpacing}
                title={`Cat #${index + 1}`}
                imageSource={
                  item.image?.url
                    ? { uri: item.image.url }
                    : require("../../assets/images/no-image.png")
                }
                onItemPress={() => {}}
                onPress={() => onPressCatDetails(item.id)}
                origin={`Favorited ${item.favoritedAt}`}
                iconGroupData={[
                  {
                    icon: "heart-icon",
                    activeIcon: "heart-solid-icon",
                    id: "1",
                    activeIconColor: white,
                    iconColor: white,
                    isActive: true,
                  },
                ]}
                iconGroupSpacing={2}
                onPressRemove={() => onPressRemoveFromFav(item.favoriteId)}
                isRemoveLoading={
                  removingId === item.favoriteId && isRemoveLoading
                }
              />
            )
          }
          keyExtractor={(item, index) =>
            isLoading ? `skeleton-${index}` : item.favoriteId
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: (width - 48) / 2,
  },
  cardSpacing: {
    marginBottom: 27,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  emptyText: {
    textAlign: "center",
  },
});
