import React, { useEffect } from "react";
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type SkeletonBoxProps = {
  height: number;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
};

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  height,
  width = "100%",
  style,
}) => {
  const shimmerTranslate = useSharedValue(-100);

  useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withTiming(200, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslate.value }],
  }));

  return (
    <View
      testID="skeleton-container"
      style={[
        {
          height,
          width,
          backgroundColor: "#E0E0E0",
          borderRadius: 14,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View style={[styles.shimmer, shimmerStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    position: "absolute",
    top: 0,
    left: -100,
    height: "100%",
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 14,
  },
});

export default React.memo(SkeletonBox);
