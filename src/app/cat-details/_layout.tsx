import { useColors } from "@/src/hooks";
import { NormalLayout } from "@/src/layout";
import { Slot } from "expo-router";
import React from "react";

export default function CatDetailsLayout(): React.ReactElement {
  const { white } = useColors();

  return (
    <NormalLayout hideHeader customBackgroundColor={white} withSafeArea={true}>
      <Slot />
    </NormalLayout>
  );
}
