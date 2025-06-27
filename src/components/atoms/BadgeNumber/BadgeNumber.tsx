import { useColors } from "@/src/hooks";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Typography from "../Typography";

type BadgeNumberProps = {
  number: number | string;
  backgroundColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
};

const BadgeNumber: React.FC<BadgeNumberProps> = ({
  number,
  backgroundColor,
  textColor,
  containerStyle,
}) => {
  const { secondaryColor400, primaryColor400 } = useColors();
  const bgColor = backgroundColor ?? secondaryColor400;

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
    >
      <Typography
        size="textXS"
        weight="semiBold"
        color={textColor || primaryColor400}
        style={styles.overrideText}
      >
        {number}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 12,
    height: 12,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  overrideText: {
    fontSize: 8,
    lineHeight: 10,
  },
});

export default React.memo(BadgeNumber);
