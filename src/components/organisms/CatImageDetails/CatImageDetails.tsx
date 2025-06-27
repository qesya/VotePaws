import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { CatImageDetailsProps } from "./CatImageDetails.types";

const fallbackImage = require("../../../assets/images/no-image.png");

const CatImageDetails: React.FC<CatImageDetailsProps> = ({ media, style }) => {
  const { gray100, secondaryColor300 } = useColors();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  const activeImageSrc = media?.[activeIndex]?.src
    ? { uri: media[activeIndex].src }
    : fallbackImage;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.bigImageContainer, { borderColor: gray100 }]}>
        <Image
          source={activeImageSrc}
          style={styles.bigImage}
          resizeMode="cover"
          accessibilityRole="image"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailContainer}
      >
        {(media?.length > 0 ? media : [{ id: "fallback", src: null }]).map(
          (item, index) => {
            const isActive = index === activeIndex;
            const borderColor = isActive ? secondaryColor300 : gray100;

            const imageSource = item?.src ? { uri: item.src } : fallbackImage;

            return (
              <Pressable
                key={item.id || `fallback-${index}`}
                onPress={() => handleSelect(index)}
                accessibilityRole="button"
                style={[styles.thumbnailWrapper, { borderColor }]}
              >
                <Image
                  source={imageSource}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                  accessibilityRole="image"
                />
              </Pressable>
            );
          },
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  bigImageContainer: {
    height: 317,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  bigImage: {
    width: "100%",
    height: "100%",
  },
  thumbnailContainer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 12,
  },
  thumbnailWrapper: {
    width: 79.75,
    height: 74,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
});

export default React.memo(CatImageDetails);
