export type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export const BUTTON_SIZES = {
  sm: 36,
  md: 40,
  lg: 44,
  xl: 56,
} as const;
