import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { MonoText } from "@/components/StyledText";

// Import predefined profile images
const profileImages = {
  luffy: require("@/assets/profile/luffy.png"),
  sanji: require("@/assets/profile/sanji.png"),
  zoro: require("@/assets/profile/zoro.png"),
  // Add more images as needed
};

export default function UpdateProfileImageScreen() {
  const [selectedImage, setSelectedImage] = useState<string>("zoro");

  useEffect(() => {
    // Load the saved profile image on component mount
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

  const handleSelectImage = (imageName: string) => {
    setSelectedImage(imageName);
  };

  const handleUpdateProfileImage = async () => {
    try {
      await AsyncStorage.setItem("pic", selectedImage);
      ToastAndroid.show(
        "Your profile image has been updated!",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.error("Failed to update profile image: ", error);
      ToastAndroid.show(
        "There was a problem updating your profile image.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Update Profile Image",
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: "SpaceMono",
          },
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageSelector}
      >
        {Object.entries(profileImages).map(([name, image]) => (
          <TouchableOpacity
            key={name}
            onPress={() => handleSelectImage(name)}
            style={[
              styles.imageThumbnail,
              selectedImage === name && styles.selectedThumbnail,
            ]}
          >
            <Image
              source={image}
              style={styles.thumbnailImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedImage && (
        <Image
          source={profileImages[selectedImage as keyof typeof profileImages]}
          style={styles.selectedImage}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdateProfileImage}
      >
        <MonoText style={styles.buttonText}>Update Profile Image</MonoText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageSelector: {
    maxHeight: 100,
    marginBottom: 20,
  },
  imageThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedThumbnail: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginVertical: 20,
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
});
