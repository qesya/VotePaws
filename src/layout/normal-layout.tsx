import { useColors } from "@/src/hooks";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

type NormalLayoutProps = {
  children: React.ReactNode;
  title?: string;
  customBackgroundColor?: string;
  customHeaderColor?: string;
  withSafeArea?: boolean;
  withGoBackBtn?: boolean;
  hideHeader?: boolean;
};

const getScreenOptions = ({
  title,
  customHeaderColor,
  background,
}: {
  title?: string;
  customHeaderColor?: string;
  background: string;
}): NativeStackNavigationOptions => ({
  gestureEnabled: true,
  title: title ?? "",
  headerTitleAlign: "center",
  headerShadowVisible: false,
  headerBackVisible: false,
  headerShown: true,
  headerStyle: {
    backgroundColor: customHeaderColor ?? background,
  },
});

export default function NormalLayout({
  children,
  title,
  customBackgroundColor,
  customHeaderColor,
  withSafeArea = true,
  withGoBackBtn,
  hideHeader = false,
}: Readonly<NormalLayoutProps>) {
  const { white } = useColors();

  const backgroundColor = customBackgroundColor ?? white;
  const Container = withSafeArea ? SafeAreaView : View;

  return (
    <Container style={[styles.safeArea, { backgroundColor }]}>
      <Stack.Screen
        options={
          hideHeader
            ? { headerShown: false }
            : getScreenOptions({
                title,
                customHeaderColor,
                background: backgroundColor,
              })
        }
      />
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
