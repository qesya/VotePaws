import { CatCard, FloatingButton, Pagination } from "@/src/components";
import CatCardSkeleton from "@/src/components/organisms/CatCard/CatCard.skeleton";
import { CatDisplayInfo } from "@/src/domain";
import { useColors } from "@/src/hooks";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type HomeViewProps = {
  cats: CatDisplayInfo[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  listRef: React.RefObject<FlashList<CatDisplayInfo>>;
  onPressCatDetails: (slug: string) => void;
  isLoading: boolean;
  onPressUpload: () => void;
};

export default function HomeView({
  cats,
  totalPages,
  currentPage,
  onPageChange,
  listRef,
  onPressCatDetails,
  isLoading,
  onPressUpload,
}: Readonly<HomeViewProps>) {
  const { white } = useColors();
  const inset = useSafeAreaInsets();

  const displayData = isLoading ? Array.from({ length: 12 }) : cats;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.stickyHeader,
          { paddingTop: inset.top, backgroundColor: white },
        ]}
      >
        <Image
          source={require("../../../assets/images/votepaws.png")}
          style={styles.logo}
        />
      </View>

      <FlashList<CatDisplayInfo>
        ref={listRef}
        data={displayData as CatDisplayInfo[]}
        estimatedItemSize={200}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<View style={{ height: 162 }} />}
        renderItem={({ item, index }) =>
          isLoading ? (
            <CatCardSkeleton key={`skeleton-${index}`} />
          ) : (
            <CatCard
              cardStyle={styles.card}
              style={styles.cardSpacing}
              title={item.name}
              imageSource={
                item.url
                  ? { uri: item.url }
                  : require("../../../assets/images/no-image.png")
              }
              onItemPress={() => {}}
              onPress={() => onPressCatDetails(item.id)}
              origin={item.origin}
            />
          )
        }
        keyExtractor={(_, index) =>
          isLoading ? `skeleton-${index}` : cats[index].id.toString()
        }
        ListFooterComponent={() => (
          <View style={styles.paginationContainer}>
            <View style={styles.paginationInner}>
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
                maxVisiblePages={2}
              />
            </View>
          </View>
        )}
      />

      <FloatingButton onPress={onPressUpload} />
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
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  card: {
    width: (width - 48) / 2,
  },
  cardSpacing: {
    marginBottom: 27,
  },
  paginationContainer: {
    marginHorizontal: -16,
  },
  paginationInner: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    marginVertical: 54,
  },
});
