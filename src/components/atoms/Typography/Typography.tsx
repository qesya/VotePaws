import { useResponsiveFontSize } from "@/src/hooks";
import { FONT_FAMILIES, FONT_SIZES, INTER_FONT_WEIGHTS } from "@/src/theme";
import React, { memo } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

export interface TypographyProps extends TextProps {
  size?: keyof typeof FONT_SIZES;
  font?: keyof typeof FONT_FAMILIES;
  weight?: keyof typeof INTER_FONT_WEIGHTS;
  style?: StyleProp<TextStyle>;
  color?: string;
  centerText?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  size = "textBase",
  font = "inter",
  weight = "regular",
  style,
  children,
  centerText,
  color,
  ...props
}) => {
  const fontSize = useResponsiveFontSize(FONT_SIZES[size]);
  const selectedFontWeights = FONT_FAMILIES[font];
  const fontFamily = selectedFontWeights[weight] || selectedFontWeights.regular;
  const lineHeight = fontSize * 1.25;

  return (
    <Text
      style={[
        { fontSize, fontFamily, lineHeight },
        { textAlign: centerText ? "center" : "left" },
        color && { color },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default memo(Typography);
