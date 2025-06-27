import { useColors } from "@/src/hooks";
import { NormalLayout } from "@/src/layout";
import { Slot } from "expo-router";
import React from "react";

export default function VotingLayout(): React.ReactElement {
  const { white } = useColors();

  return (
    <NormalLayout
      hideHeader
      title="Vote"
      customBackgroundColor={white}
      withSafeArea={true}
    >
      <Slot />
    </NormalLayout>
  );
}
