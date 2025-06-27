const baseColor = {
  white: "#FFFFFF",
  black: "#000000",
} as const;

type BaseColor = typeof baseColor;
type Theme = "light" | "dark";

interface ColorPalette {
  white: string;
  black: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  primaryColor50: string;
  primaryColor100: string;
  primaryColor200: string;
  primaryColor300: string;
  primaryColor400: string;
  primaryColor500: string;
  primaryColor600: string;
  secondaryColor50: string;
  secondaryColor100: string;
  secondaryColor200: string;
  secondaryColor300: string;
  secondaryColor400: string;
  secondaryColor500: string;
  secondaryColor600: string;
  error50: string;
  error100: string;
  error200: string;
  error300: string;
  error400: string;
  error500: string;
  error600: string;
  warning50: string;
  warning100: string;
  warning200: string;
  warning300: string;
  warning400: string;
  warning500: string;
  warning600: string;
  success50: string;
  success100: string;
  success200: string;
  success300: string;
  success400: string;
  success500: string;
  success600: string;
  transparent: string;
}

const createColorPalette = (
  baseColor: BaseColor,
  _theme: Theme,
): ColorPalette => ({
  white: baseColor.white,
  black: baseColor.black,
  gray50: "#F9FAFB",
  gray100: "#F2F4F7",
  gray200: "#EAECF0",
  gray300: "#D0D5DD",
  gray400: "#98A2B3",
  gray500: "#667085",
  gray600: "#344054",
  gray700: "#101828",
  primaryColor50: "#D5D9EB",
  primaryColor100: "#B9C0DE",
  primaryColor200: "#7482BD",
  primaryColor300: "#5162AC",
  primaryColor400: "#2E439C",
  primaryColor500: "#1F2D68",
  primaryColor600: "#0F1634",
  secondaryColor50: "#FFF4DC",
  secondaryColor100: "#FFEDC4",
  secondaryColor200: "#FFDC89",
  secondaryColor300: "#FFD36C",
  secondaryColor400: "#FFCA4E",
  secondaryColor500: "#AA8734",
  secondaryColor600: "#55431A",
  error50: "#FFFBFA",
  error100: "#FEF3F2",
  error200: "#FECDCA",
  error300: "#FDA29B",
  error400: "#F97066",
  error500: "#D92D20",
  error600: "#912018",
  warning50: "#FFFCF5",
  warning100: "#FFFAEB",
  warning200: "#FEDF89",
  warning300: "#FEC84B",
  warning400: "#FDB022",
  warning500: "#DC6803",
  warning600: "#93370D",
  success50: "#F6FEF9",
  success100: "#ECFDF3",
  success200: "#A6F4C5",
  success300: "#6CE9A6",
  success400: "#32D583",
  success500: "#039855",
  success600: "#05603A",
  transparent: "transparent",
});

export const Colors = {
  light: createColorPalette(baseColor, "light"),
  dark: createColorPalette(baseColor, "dark"),
};
