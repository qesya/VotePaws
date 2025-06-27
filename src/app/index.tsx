import { useColors } from "@/src/hooks";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Index() {
  const { white } = useColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Animate logo scaling
  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  // Navigate to /home after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.navigate("/home");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: white }]}>
      <Animated.Image
        source={require("../assets/images/votepaws.png")}
        style={[styles.logo, animatedStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },
});
