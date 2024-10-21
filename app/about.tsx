import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is About Page </MonoText>
      <MonoText>[ app/about.tsx ]</MonoText>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <MonoText style={styles.buttonText}>Go Back</MonoText>
        </TouchableOpacity>
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
