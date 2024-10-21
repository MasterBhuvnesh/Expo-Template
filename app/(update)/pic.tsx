import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { MonoText } from "@/components/StyledText";
// Import predefined profile images
const profileImages = [
  require("@/assets/profile/naruto.png"),
  require("@/assets/profile/luffy.png"),
  require("@/assets/profile/sanji.png"),
  require("@/assets/profile/zoro.png"),
  // Add more images as needed
];

export default function UpdateProfileImageScreen() {
  const { user } = useUser();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleSelectImage = (index: number) => {
    setSelectedImage(index);
  };

  const handleUpdateProfileImage = async () => {
    if (selectedImage === null) {
      Alert.alert("Please select an image first!");
      return;
    }

    try {
      // Get the selected image's URI
      const imageUri = Image.resolveAssetSource(
        profileImages[selectedImage]
      ).uri;

      // Fetch the image as a blob
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create a File object
      const fileName = `profile_image_${Date.now()}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // Update user profile image
      await user?.setProfileImage({ file });
      ToastAndroid.show(
        "Your profile image has been updated!",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.error("Failed to update profile image: ", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
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
        {profileImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectImage(index)}
            style={[
              styles.imageThumbnail,
              selectedImage === index && styles.selectedThumbnail,
            ]}
          >
            <Image
              source={image}
              style={styles.thumbnailImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedImage !== null && (
        <Image
          source={profileImages[selectedImage]}
          style={styles.selectedImage}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleUpdateProfileImage();
        }}
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
