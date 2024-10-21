import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { router, usePathname } from "expo-router";
import { StyleSheet } from "react-native";
import { Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { ColorSchemeName } from "react-native";
import Colors from "@/constants/Colors";

const CustomDrawerContent = ({
  iconSize = 12,
  ...props
}: { iconSize?: number } & any) => {
  const pathname = usePathname();
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme() ?? "light";

  const getItemColor = (itemPath: string) => {
    const isActive = pathname === itemPath;
    if (colorScheme === "dark") {
      return isActive ? "black" : "white";
    } else {
      return isActive ? "white" : "black";
    }
  };

  const getItemBackgroundColor = (itemPath: string) => {
    const isActive = pathname === itemPath;
    return isActive ? Colors[colorScheme].tint : "transparent";
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: Colors[colorScheme].background }}
    >
      <DrawerItem
        icon={({ color }) => (
          <FontAwesome5
            name="home"
            size={iconSize}
            color={getItemColor("/")}
          />
        )}
        label="Home"
        labelStyle={[styles.navItemLabel, { color: getItemColor("/") }]}
        style={{
          backgroundColor: getItemBackgroundColor("/"),
        }}
        onPress={() => {
          // router.push("/");
          router.dismissAll();
        }}
      />
      <DrawerItem
        icon={({ color }) => (
          <Feather
            name="list"
            size={iconSize}
            color={getItemColor("/feed")}
          />
        )}
        label="Feed"
        labelStyle={[styles.navItemLabel, { color: getItemColor("/feed") }]}
        style={{
          backgroundColor: getItemBackgroundColor("/feed"),
        }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/feed");
        }}
      />
      <DrawerItem
        icon={({ color }) => (
          <AntDesign
            name="user"
            size={iconSize}
            color={getItemColor("/two")}
          />
        )}
        label="Profile"
        labelStyle={[styles.navItemLabel, { color: getItemColor("/two") }]}
        style={{ backgroundColor: getItemBackgroundColor("/two") }}
        onPress={() => {
          router.push("/(drawer)/(tabs)/two");
        }}
      />
      <DrawerItem
        icon={({ color }) => (
          <AntDesign
            name="hearto"
            size={iconSize}
            color={getItemColor("/favourites")}
          />
        )}
        label="Favourites"
        labelStyle={[
          styles.navItemLabel,
          { color: getItemColor("/favourites") },
        ]}
        style={{
          backgroundColor: getItemBackgroundColor("/favourites"),
        }}
        onPress={() => {
          router.push("/favourites");
        }}
      />
      <DrawerItem
        icon={({ color }) => (
          <AntDesign
            name="setting"
            size={iconSize}
            color={getItemColor("/settings")}
          />
        )}
        label="Settings"
        labelStyle={[styles.navItemLabel, { color: getItemColor("/settings") }]}
        style={{
          backgroundColor: getItemBackgroundColor("/settings"),
        }}
        onPress={() => {
          router.push("/settings");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return <DrawerLayoutNav />;
}

function DrawerLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            iconSize={12}
          />
        )}
        screenOptions={{
          headerShown: false,
          headerTintColor:
            colorScheme === "dark" ? Colors[colorScheme].tint : "black",
        }}
      >
        <Drawer.Screen
          name="favourites"
          options={{
            title: "Favourites",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 14,
              fontFamily: "SpaceMono",
            },
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 14,
              fontFamily: "SpaceMono",
            },
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
});
