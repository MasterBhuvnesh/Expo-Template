import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops!",
          headerTitleStyle: { fontSize: 14, fontFamily: "SpaceMono" },
        }}
      />
      <View style={styles.container}>
        <MonoText style={styles.title}>This screen doesn't exist.</MonoText>

        <Link
          href="/"
          style={styles.link}
        >
          <MonoText style={styles.linkText}>Go to home screen!</MonoText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 14,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
