import { useColors } from "@/src/hooks";
import { NormalLayout } from "@/src/layout";
import { Slot } from "expo-router";
import React from "react";

export default function HomeLayout(): React.ReactElement {
  const { white } = useColors();

  return (
    <NormalLayout
      hideHeader
      title="Home"
      customBackgroundColor={white}
      withSafeArea={false}
    >
      <Slot />
    </NormalLayout>
  );
}
