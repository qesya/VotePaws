import { useColorScheme } from "@/src/hooks/useColorScheme";
import { useMemo } from "react";
import { Colors } from "../theme/colors";

export function useColors(overrideTheme?: "light" | "dark") {
  const systemTheme = useColorScheme() ?? "light";
  const theme = overrideTheme ?? systemTheme;

  return useMemo(() => Colors[theme], [theme]);
}
