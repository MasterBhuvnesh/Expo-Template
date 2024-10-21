import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { router } from "expo-router";

// Custom Bottom Sheet
import CustomBottomSheet from "@/components/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

export default function TabTwoScreen() {
  // Ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [title, setTitle] = useState(
    "called by [ app/(drawer)/(tabs)/two.tsx ]"
  );

  /* 
   * Functions to handle the bottom sheet using buttons
   * handleClosePress: Closes the bottom sheet
   * handleOpenPress: Expands the bottom sheet
   
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  */

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is Profile Page </MonoText>
      <MonoText>[ app/(drawer)/(tabs)/two.tsx ]</MonoText>
      <View style={{ marginTop: 20, gap: 10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.dismissAll()} // It will dismiss all the screens in the stack and go back to the root screen thats "/" which is the home page [ app/index.tsx ]
        >
          <MonoText style={styles.buttonText}>Home Page</MonoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // This will open the bottom sheet at index 0
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        >
          <MonoText style={styles.buttonText}>Open Bottom Sheet</MonoText>
        </TouchableOpacity>
        {/* 
        <Button title="Open" onPress={handleOpenPress} />
        <Button title="Close" onPress={handleClosePress} />
         */}
      </View>
      <CustomBottomSheet
        ref={bottomSheetRef}
        title={title}
      />
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
