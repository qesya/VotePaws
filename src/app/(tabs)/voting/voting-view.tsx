import { Typography } from "@/src/components";
import { VotingImage } from "@/src/domain";
import { useColors } from "@/src/hooks";
import React, { useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";

const { width } = Dimensions.get("window");

type VotingViewProps = {
  data: VotingImage[];
  isLoading?: boolean;
  isVoting?: boolean;
  onLike: (imageId: string) => void;
  onDislike: (voteId: string) => void;
};

export default function VotingView({
  data,
  isLoading,
  onLike,
  onDislike,
  isVoting,
}: Readonly<VotingViewProps>) {
  const { success500, error500, white, warning500 } = useColors();
  const ref = useRef<SwiperCardRefType>(null);

  const renderCard = useCallback(
    (image: VotingImage) => (
      <View style={styles.renderCardContainer}>
        <Image
          source={{ uri: image.url }}
          style={styles.renderCardImage}
          resizeMode="cover"
        />
        <View style={styles.voteCountBadge}>
          <Typography size="textXS" weight="bold" color="white">
            ❤️ {image.totalVotes} votes
          </Typography>
        </View>
      </View>
    ),
    [],
  );

  const renderFlippedCard = useCallback(
    (_: VotingImage, index: number) => (
      <View style={styles.renderFlippedCardContainer}>
        <Typography style={styles.text}>You flipped card #{index}</Typography>
      </View>
    ),
    [],
  );

  const OverlayLabelRight = useCallback(
    () => (
      <View
        style={[styles.overlayLabelContainer, { backgroundColor: success500 }]}
      >
        <Typography size="text4XL" weight="bold" color={white}>
          I LOVE IT 😻
        </Typography>
      </View>
    ),
    [success500, white],
  );

  const OverlayLabelLeft = useCallback(
    () => (
      <View
        style={[styles.overlayLabelContainer, { backgroundColor: error500 }]}
      >
        <Typography size="text4XL" weight="bold" color={white}>
          SKIP ✋🏻
        </Typography>
      </View>
    ),
    [error500, white],
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={warning500} />
        <Typography style={styles.loadingText}>
          Preparing voting deck...
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageWrapper}>
        <Image
          source={require("../../../assets/images/votepaws.png")}
          style={styles.topImage}
        />
      </View>

      <Swiper
        ref={ref}
        data={data}
        cardStyle={styles.cardStyle}
        overlayLabelContainerStyle={styles.overlayLabelContainerStyle}
        renderCard={renderCard}
        FlippedContent={renderFlippedCard}
        onSwipeRight={(index) => {
          const image = data[index];
          if (image) onLike(image.id);
        }}
        onSwipeLeft={(index) => {
          const image = data[index];
          if (image) onDislike(image.voteId);
        }}
        onIndexChange={(index) => console.log("Active index:", index)}
        onSwipedAll={() => console.log("Swiped all cards")}
        OverlayLabelRight={OverlayLabelRight}
        OverlayLabelLeft={OverlayLabelLeft}
        loop
        // prerenderItems={20}
        disableBottomSwipe
        disableTopSwipe
        disableLeftSwipe={isVoting}
        disableRightSwipe={isVoting}
      />

      {isVoting && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={warning500} />
          <Typography size="textXL" weight="semiBold" color={warning500}>
            😸 Submitting vote 🗳️
          </Typography>
        </View>
      )}

      <View style={styles.instructionWrapper}>
        <Typography size="textLG" weight="medium" color="#666">
          👈 Swipe left to skip, right to vote 😻
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  renderCardContainer: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  renderFlippedCardContainer: {
    borderRadius: 15,
    backgroundColor: "#baeee5",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardStyle: {
    width: "90%",
    height: "70%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  overlayLabelContainer: {
    marginTop: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "70%",
  },
  overlayLabelContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    gap: 12,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.70)",
    justifyContent: "center",
    alignItems: "center",
  },
  topImageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  topImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  instructionWrapper: {
    position: "absolute",
    bottom: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#001a72",
  },
  voteCountBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});
