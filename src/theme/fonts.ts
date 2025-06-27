export const FONT_SIZES = {
  textXS: 12,
  textSM: 14,
  textBase: 16,
  textLG: 18,
  textXL: 20,
  text2XL: 24,
  text3XL: 30,
  text4XL: 36,
  text5XL: 48,
  text6XL: 60,
  text7XL: 72,
} as const;

export const INTER_FONT_WEIGHTS = {
  extraLight: "InterExtraLight",
  light: "InterLight",
  regular: "InterRegular",
  medium: "InterMedium",
  semiBold: "InterSemibold",
  bold: "InterBold",
} as const;

export const FONT_FAMILIES = {
  inter: INTER_FONT_WEIGHTS,
} as const;
