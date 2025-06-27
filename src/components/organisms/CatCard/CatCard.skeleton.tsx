import { SkeletonBox } from "@/src/components";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const ProductCardSkeleton = () => {
  return (
    <View style={[styles.card]}>
      <SkeletonBox height={CARD_WIDTH} style={styles.image} />
      <SkeletonBox height={12} width="80%" style={styles.title} />
      <SkeletonBox height={12} width="40%" style={styles.price} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 27,
  },
  image: {
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  title: {
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    marginTop: 12,
    marginBottom: 6,
  },
  price: {
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
});

export default React.memo(ProductCardSkeleton);
