import { StatusBar } from "expo-status-bar";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { Link, Stack } from "expo-router";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      {/* If the user is  login it's screen title will be Home */}
      <SignedIn>
        <Stack.Screen
          options={{
            title: "Home",
            headerTitleStyle: {
              fontSize: 14,
              fontFamily: "SpaceMono",
            },
          }}
        />
        <MonoText style={styles.title}>This is Index Page</MonoText>
        <MonoText style={styles.text}>[ app/index.tsx ]</MonoText>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Link
            href="/about"
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <MonoText style={styles.buttonText}>About Page</MonoText>
            </TouchableOpacity>
          </Link>
          <Link
            href="/blog"
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <MonoText style={styles.buttonText}>Blog Page</MonoText>
            </TouchableOpacity>
          </Link>
          <Link
            href="/(drawer)/(tabs)/feed"
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <MonoText style={styles.buttonText}>Tabs</MonoText>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedIn>

      <SignedOut>
        {/* If the user is not login it's screen title will be Authentication */}
        <Stack.Screen
          options={{
            title: "Authentication",
            headerTitleStyle: {
              fontSize: 14,
              fontFamily: "SpaceMono",
            },
          }}
        />
        <MonoText>[ app/index.tsx ]</MonoText>
        <MonoText style={styles.text}>
          Login Please [ we are using Clerk for auth ]
        </MonoText>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Link
            href="/(auth)/sign-in"
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <MonoText style={styles.buttonText}>Sign In</MonoText>
            </TouchableOpacity>
          </Link>
          <Link
            href="/(auth)/sign-up"
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <MonoText style={styles.buttonText}>Sign Up</MonoText>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#007bff",
    padding: 10,
    width: 200,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  text: { padding: 10, fontSize: 10, textAlign: "center" },
});
