import {
  Button,
  CatImageDetails,
  HeaderMenu,
  Typography,
} from "@/src/components";
import { CatImageDetailsMedia } from "@/src/components/organisms/CatImageDetails/CatImageDetails.types";
import { useColors } from "@/src/hooks";
import {
  insetBottomAndroidOnly,
  insetTopAndroidOnly,
} from "@/src/utils/insets";
import React from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import CatDetailsViewSkeleton from "./cat-details-view-skeleton";

type CatDetailsViewProps = {
  isLoading: boolean;
  media: CatImageDetailsMedia[];
  title: string;
  origin: string;
  description: string | null;
  temperament?: string;
  lifeSpan?: string;
  wikipediaUrl?: string;
  onFavoritePress: () => void;
  onPressGoBack: () => void;
  onPressGoToFav: () => void;
  isAddToFavLoading?: boolean;
  badgeCount?: number;
};

export default function CatDetailsView({
  isLoading,
  media,
  title,
  origin,
  description,
  temperament,
  lifeSpan,
  wikipediaUrl,
  onFavoritePress,
  onPressGoBack,
  onPressGoToFav,
  isAddToFavLoading,
  badgeCount,
}: Readonly<CatDetailsViewProps>) {
  const { primaryColor400, gray600, warning500 } = useColors();
  const hasDescription = !!description && description.trim().length > 0;

  if (isLoading) {
    return <CatDetailsViewSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: insetTopAndroidOnly }}>
        <HeaderMenu
          onFavPress={onPressGoToFav}
          onPressBack={onPressGoBack}
          badgeCount={badgeCount}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innterContainer}>
          <CatImageDetails media={media} style={styles.productWrapper} />

          <Typography size="textXL" weight="semiBold" style={styles.txtTitle}>
            {title}
          </Typography>

          <Typography
            size="textXL"
            weight="medium"
            color={primaryColor400}
            style={styles.txtDesc}
          >
            {origin}
          </Typography>

          {hasDescription && (
            <Typography size="textSM" weight="regular" color={gray600}>
              {description}
            </Typography>
          )}

          {temperament && (
            <Typography size="textSM" weight="regular" style={styles.txtExtra}>
              <Typography weight="bold">Temperament: </Typography>
              {temperament}
            </Typography>
          )}

          {lifeSpan && (
            <Typography size="textSM" weight="regular" style={styles.txtExtra}>
              <Typography weight="bold">Life Span: </Typography>
              {lifeSpan} years
            </Typography>
          )}

          {wikipediaUrl && (
            <Typography
              size="textSM"
              weight="regular"
              style={styles.txtExtra}
              onPress={() => Linking.openURL(wikipediaUrl)}
            >
              <Typography weight="bold">Wikipedia: </Typography>
              {wikipediaUrl}
            </Typography>
          )}

          <View style={styles.actionWrapper}>
            <View style={styles.addBtn}>
              <Button
                onPress={onFavoritePress}
                title="Add To Favorite"
                type="primary"
                icon="heart-solid-icon"
                isDisabled={isAddToFavLoading}
                isLoading={isAddToFavLoading}
                style={{ backgroundColor: warning500 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: insetBottomAndroidOnly,
  },
  productWrapper: {
    marginTop: 16,
    marginBottom: 40,
  },
  txtTitle: {
    marginBottom: 12,
  },
  txtDesc: {
    marginBottom: 12,
  },
  txtExtra: {
    marginTop: 8,
    marginBottom: 4,
  },
  innterContainer: {
    paddingHorizontal: 16,
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 48,
  },
  addBtn: {
    flex: 1,
  },
});
