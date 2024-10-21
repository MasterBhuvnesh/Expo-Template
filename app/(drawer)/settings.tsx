import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";

// auth related
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

// Custom Bottom Sheet
import CustomBottomSheet from "@/components/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

export default function SettingsScreen() {
  // auth related hooks
  const { user } = useUser(); // Use useUser to access user
  const { signOut } = useAuth(); // Use useAuth to access signOut
  const router = useRouter(); // Initialize router
  // logout function auth
  const handleLogout = async () => {
    await signOut(); // Sign out the user
    // router.replace("/"); // Redirect to sign-in page after logout
    router.dismissAll();
  };
  /*

  // Ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

*/
  const [title, setTitle] = useState("called by [ app/(drawer)/settings.tsx ]");
  return (
    <View style={styles.container}>
      {/*

      <CustomBottomSheet
        ref={bottomSheetRef}
        title={title}
      />

      */}
      <MonoText style={styles.title}> This is Settings Page </MonoText>
      <MonoText>[ app/(drawer)/settings.tsx ]</MonoText>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {/*       
      <TouchableOpacity
        style={styles.button}
        // This will open the bottom sheet at max height (in this case its 25% )
        onPress={() => bottomSheetRef.current?.expand()}
      >
        <MonoText style={styles.buttonText}>Open Bottom Sheet</MonoText>
      </TouchableOpacity> 
      
      */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/name" as never)}
      >
        <MonoText style={styles.buttonText}>Update Name</MonoText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/pic" as never)}
      >
        <MonoText style={styles.buttonText}>Update Profile Image</MonoText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // This will open the bottom sheet at max height (in this case its 25% )
        onPress={handleLogout}
      >
        <MonoText style={styles.buttonText}>Logout</MonoText>
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
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
});
