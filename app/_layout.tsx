import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // Clerk Public Key
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <BottomSheetModalProvider>
              {/* Provide BottomSheet  */}
              <Stack>
                <Stack.Screen
                  name="index"
                  options={{
                    title: "Home",
                    headerTitleStyle: {
                      fontSize: 14,
                      fontFamily: "SpaceMono",
                    },
                    headerRight: () => (
                      <Link
                        href="/modal"
                        asChild
                      >
                        <Pressable>
                          {({ pressed }) => (
                            <FontAwesome
                              name="info-circle"
                              size={20}
                              color={Colors[colorScheme ?? "light"].text}
                              style={{
                                marginRight: 15,
                                opacity: pressed ? 0.5 : 1,
                              }}
                            />
                          )}
                        </Pressable>
                      </Link>
                    ),
                  }}
                />
                <Stack.Screen
                  name="(drawer)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="blog/index"
                  options={{
                    title: "All Blog Posts",
                    headerTitleStyle: {
                      fontSize: 14,
                      fontFamily: "SpaceMono",
                    },
                  }}
                />
                <Stack.Screen
                  name="about"
                  options={{
                    title: "About",
                    headerTitleStyle: {
                      fontSize: 14,
                      fontFamily: "SpaceMono",
                    },
                  }}
                />
                <Stack.Screen
                  name="modal"
                  options={{
                    title: "Contact",
                    headerTitleStyle: {
                      fontSize: 14,
                      fontFamily: "SpaceMono",
                    },
                    presentation: "modal",
                  }}
                />
                <Stack.Screen
                  name="(auth)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(update)"
                  options={{ headerShown: false }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
