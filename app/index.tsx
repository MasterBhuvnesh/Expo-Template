import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { Link, useRouter } from "expo-router";

export default function MainScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is Index Page </MonoText>
      <MonoText>[ app/index.tsx ]</MonoText>
      <View style={{ marginTop: 20, gap: 10 }}>
        <Link
          href={"/about"}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <MonoText style={styles.buttonText}>About Page</MonoText>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/blog"}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <MonoText style={styles.buttonText}>Blog Page</MonoText>
          </TouchableOpacity>
        </Link>

        <Link
          href={"/(drawer)/(tabs)/feed"}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <MonoText style={styles.buttonText}>Tabs</MonoText>
          </TouchableOpacity>
        </Link>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
