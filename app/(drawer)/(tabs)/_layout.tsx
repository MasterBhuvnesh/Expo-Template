import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 5,
        },
        tabBarActiveTintColor:
          colorScheme === "dark" ? Colors[colorScheme].tint : "black",
        headerShown: useClientOnlyValue(false, true),
        headerLeft: () => (
          <DrawerToggleButton
            tintColor={
              colorScheme === "dark" ? Colors[colorScheme].tint : "black"
            }
          />
        ),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: "SpaceMono",
          },
          tabBarIcon: ({ color }) => (
            <Feather
              name="list"
              size={15}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
          headerRight: () => (
            <Link
              href="/feed/new"
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={14}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 20, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Profile",
          headerTitleStyle: { fontSize: 14, fontFamily: "SpaceMono" },
          tabBarIcon: ({ color }) => (
            <AntDesign
              size={15}
              style={{ marginBottom: -3 }}
              name="user"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
