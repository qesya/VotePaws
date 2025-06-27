import { Icon } from "@/src/components";
import { useColors } from "@/src/hooks";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { gray300, warning500 } = useColors();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: warning500 }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              icon="heart-icon"
              width={24}
              height={24}
              fill={focused ? warning500 : gray300}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="voting"
        options={{
          title: "Vote",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              icon="chevron-up-icon"
              width={24}
              height={24}
              fill={focused ? warning500 : gray300}
            />
          ),
        }}
      />
    </Tabs>
  );
}
