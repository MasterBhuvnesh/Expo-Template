import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";

// Custom Bottom Sheet
import CustomBottomSheet from "@/components/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
export default function SettingsScreen() {
  // Ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [title, setTitle] = useState("called by [ app/(drawer)/settings.tsx ]");
  return (
    <View style={styles.container}>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title={title}
      />
      <MonoText style={styles.title}> This is Settings Page </MonoText>
      <MonoText>[ app/(drawer)/settings.tsx ]</MonoText>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <TouchableOpacity
        style={styles.button}
        // This will open the bottom sheet at max height (in this case its 25% )
        onPress={() => bottomSheetRef.current?.expand()}
      >
        <MonoText style={styles.buttonText}>Open Bottom Sheet</MonoText>
      </TouchableOpacity>
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
});
