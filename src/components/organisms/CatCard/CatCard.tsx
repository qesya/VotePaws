import {
  Button,
  ButtonIconGroup,
  PressableButton,
  Typography,
} from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { CatCardProps } from "./CatCard.types";

const CatCard: React.FC<CatCardProps> = ({
  imageSource,
  title,
  onPress,
  style,
  cardStyle,
  origin,
  imageSize = 164,
  iconGroupData,
  onItemPress,
  onPressRemove,
  isRemoveLoading,
}) => {
  const { gray700, warning500 } = useColors();

  return (
    <View style={style}>
      <PressableButton
        onPress={onPress}
        style={[styles.cardContainer, { width: imageSize }]}
      >
        <View
          style={[
            styles.imageContainer,
            { width: imageSize, height: imageSize },
            cardStyle,
          ]}
        >
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        </View>

        {iconGroupData && iconGroupData.length > 0 && (
          <View style={styles.iconGroupWrapper}>
            <ButtonIconGroup data={iconGroupData} onItemPress={onItemPress} />
          </View>
        )}
      </PressableButton>

      <View style={styles.infoContainerMobile}>
        <Typography
          size="textXS"
          weight="semiBold"
          color={gray700}
          style={styles.titleTextMobile}
          numberOfLines={2}
        >
          {title}
        </Typography>
        <Typography
          size="textXS"
          weight="bold"
          color={warning500}
          style={styles.priceTextMobile}
        >
          {origin}
        </Typography>
      </View>

      {onPressRemove && (
        <View style={styles.removeButtonContainer}>
          {isRemoveLoading ? (
            <ActivityIndicator size="small" color={warning500} />
          ) : (
            <Button onPress={onPressRemove} title="Remove" type="outline" />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-start",
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    borderWidth: 2,
    borderColor: "hsla(216, 24%, 96%, 1)",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  infoContainerMobile: {
    marginTop: 12,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleTextMobile: {
    marginBottom: 4,
  },
  priceTextMobile: {},
  iconGroupWrapper: {
    position: "absolute",
    top: 0,
    right: -6,
    zIndex: 10,
  },
  removeButtonContainer: {
    marginTop: 12,
  },
});

export default React.memo(CatCard);
