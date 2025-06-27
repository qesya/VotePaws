import { useColors } from "@/src/hooks";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableButton } from "../Button";
import Icon from "../Icon";

type FloatingButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

export default function FloatingButton({
  onPress,
  style,
}: Readonly<FloatingButtonProps>) {
  const insets = useSafeAreaInsets();
  const { white, black } = useColors();

  return (
    <PressableButton
      style={[
        styles.fab,
        { bottom: insets.bottom, backgroundColor: black },
        style,
      ]}
      onPress={onPress}
    >
      <Icon icon="plus-icon" width={20} height={20} fill={white} />
    </PressableButton>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 20,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "white",
    resizeMode: "contain",
  },
});
