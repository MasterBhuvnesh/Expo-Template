import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, usePathname } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const showPlusIcon = !["/feed/new", "/feed/add"].includes(pathname);

  return (
    //  Style the tabs bar
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          position: "absolute",
          bottom: 40,
          justifyContent: "center",
          alignSelf: "center",
          height: 50,
          marginHorizontal: 100,
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingBottom: 8,
          borderRadius: 40,
          borderWidth: 1,
          borderTopWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].tabIconDefault,
          borderTopColor: Colors[colorScheme ?? "light"].tabIconDefault,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor:
          colorScheme === "dark"
            ? "gray"
            : Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarActiveTintColor:
          colorScheme === "dark"
            ? "white"
            : Colors[colorScheme ?? "light"].tint,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: useClientOnlyValue(false, true),
        headerLeft: () => (
          <DrawerToggleButton
            tintColor={
              colorScheme === "dark" ? Colors[colorScheme].tint : "black"
            }
          />
        ),
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === "feed") {
            iconName = focused ? "list" : "list";
          } else if (route.name === "two") {
            iconName = focused ? "user" : "user";
          }

          // You can return any component here
          return (
            <Feather
              name={iconName as any}
              size={15}
              color={color}
            />
          );
        },
      })}
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
          headerRight: () =>
            showPlusIcon ? (
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
            ) : null,
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
