import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is Contact Page </MonoText>
      <MonoText>[ app/modal.tsx ]</MonoText>
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
});
