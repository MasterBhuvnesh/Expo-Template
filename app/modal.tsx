import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import CopyButton from "@/components/Copy";
import Colors from "@/constants/Colors";
export default function ModalScreen() {
  const GitHubUrl = " https://github.com/MasterBhuvnesh/Expo-Template";

  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is Contact Page </MonoText>
      <MonoText>[ app/modal.tsx ]</MonoText>
      <MonoText
        style={{
          marginTop: 10,
          fontSize: 10,
          padding: 10,
          textAlign: "center",
        }}
      >
        Download Expo Template from the github url is given below ^_^
      </MonoText>
      <View
        style={[
          styles.codeContainer,
          { borderColor: Colors[colorScheme ?? "light"].text },
        ]}
      >
        <View style={styles.code}>
          <MonoText style={styles.codeText}> {GitHubUrl} </MonoText>
        </View>
        <CopyButton
          text={GitHubUrl}
          style={{ marginRight: 15 }}
        />
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
    gap: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  codeContainer: {
    marginTop: 24,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  code: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  codeText: {
    fontSize: 7,
  },
});
