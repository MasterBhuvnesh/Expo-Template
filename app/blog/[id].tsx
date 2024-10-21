import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useLocalSearchParams, router, Stack } from "expo-router";

export default function Page() {
  const { id, author } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `Article ${id} ${author ? `written by ${author}` : ""}`,
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: "SpaceMono",
          },
        }}
      />
      <MonoText>[ app/blog/[id].tsx ]</MonoText>
      <MonoText>id: {id}</MonoText>
      {author && <MonoText>author: {author}</MonoText>}
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
