import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profileImages = {
  luffy: require("@/assets/profile/luffy.png"),
  sanji: require("@/assets/profile/sanji.png"),
  zoro: require("@/assets/profile/zoro.png"),
  // Add more images as needed
};

export default function AboutScreen() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<string>("zoro");

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("pic");
      if (savedImage !== null) {
        setSelectedImage(savedImage);
      }
    } catch (error) {
      console.error("Failed to load profile image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is About Page </MonoText>
      <MonoText>[ app/about.tsx ]</MonoText>

      <View style={styles.imageContainer}>
        <Image
          source={profileImages[selectedImage as keyof typeof profileImages]}
          style={styles.profileImage}
        />
      </View>

      {user && (
        <MonoText style={styles.userInfo}>
          First Name : {user?.firstName} {"\n"}
          Last Name : {user?.lastName} {"\n"}
          User Email : {user?.emailAddresses[0].emailAddress} {"\n"}
          User ID : {user?.id} {"\n"}
          Username : {user?.username} {"\n"}
          Created At : {user?.createdAt?.toLocaleString()} {"\n"}
          Last Sign In At : {user?.lastSignInAt?.toLocaleString()}
        </MonoText>
      )}

      <View style={styles.buttonContainer}>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    fontSize: 10,
    textAlign: "left",
    marginVertical: 20,
    borderBottomColor: "#007bff",
    borderTopColor: "#007bff",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  buttonContainer: {
    marginTop: 20,
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
