import React, { useState } from "react";
import {
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Platform,
  StyleProp,
  TextStyle,
  useColorScheme,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function CopyButton({
  text,
  style,
}: {
  text: string;
  style?: StyleProp<TextStyle>;
}) {
  const [buttonText, setButtonText] = useState("Copy");
  const colorScheme = useColorScheme();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);

    // Display a success message
    if (Platform.OS === "android") {
      ToastAndroid.show("Text copied to clipboard!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", "Text copied to clipboard!");
    }

    setButtonText("Copied!");
    setTimeout(() => setButtonText("Copy"), 2000);
  };

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      {buttonText === "Copy" ? (
        <Feather
          name="copy"
          size={14}
          color={Colors[colorScheme ?? "light"].text}
          style={style}
        />
      ) : (
        <MaterialIcons
          name="done"
          size={14}
          color={Colors[colorScheme ?? "light"].text}
          style={style}
        />
      )}
    </TouchableOpacity>
  );
}

export default CopyButton;
