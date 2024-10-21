import React, { useState } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { ToastAndroid } from "react-native";
import { router, Stack } from "expo-router";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
export default function UpdateNameScreen() {
  const { user } = useUser(); // Only destructure 'user'
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const colorScheme = useColorScheme();

  const handleUpdate = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      ToastAndroid.show(
        "First and last name cannot be empty",
        ToastAndroid.SHORT
      );
      return;
    }

    try {
      await user?.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      ToastAndroid.show("Your name has been updated!", ToastAndroid.SHORT);
      router.back();
    } catch (error) {
      ToastAndroid.show(
        "There was a problem updating your name.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Update Name`,
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: "SpaceMono",
          },
        }}
      />
      <TextInput
        autoCapitalize="none"
        value={firstName}
        placeholder="First Name"
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        style={[
          styles.input,
          {
            color: Colors[colorScheme ?? "light"].text,
            borderBottomColor: Colors[colorScheme ?? "light"].text,
          },
        ]}
        onChangeText={setFirstName}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        style={[
          styles.input,
          {
            color: Colors[colorScheme ?? "light"].text,
            borderBottomColor: Colors[colorScheme ?? "light"].text,
          },
        ]}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
      >
        <MonoText style={styles.buttonText}>Update Name</MonoText>
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
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  input: {
    padding: 10,
    fontSize: 10,
    fontFamily: "SpaceMono",
    width: "70%",
    borderWidth: 0,
    borderBottomWidth: 1,
  },
});
