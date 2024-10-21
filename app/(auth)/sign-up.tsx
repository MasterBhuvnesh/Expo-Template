import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View } from "@/components/Themed";
import React from "react";
import {
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { MonoText } from "@/components/StyledText";
import Colors from "@/constants/Colors";

export default function SignUpScreen() {
  const colorScheme = useColorScheme();

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    const username = emailAddress.split("@")[0];

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
        username,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const originalMessage =
        err.errors?.[0]?.message || "An error occurred during sign up";
      const errorMessage =
        originalMessage ===
        "Password has been found in an online data breach. For account safety, please use a different password."
          ? "Please use a strong password"
          : originalMessage;
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // router.replace("/");
        router.dismissAll();
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      ToastAndroid.show(err.errors[0].message, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
            style={[
              styles.input,
              {
                color: Colors[colorScheme ?? "light"].text,
                borderBottomColor: Colors[colorScheme ?? "light"].text,
              },
            ]}
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextInput
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
            style={[
              styles.input,
              {
                color: Colors[colorScheme ?? "light"].text,
                borderBottomColor: Colors[colorScheme ?? "light"].text,
              },
            ]}
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
            style={[
              styles.input,
              {
                color: Colors[colorScheme ?? "light"].text,
                borderBottomColor: Colors[colorScheme ?? "light"].text,
              },
            ]}
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            value={password}
            placeholder="Password..."
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
            style={[
              styles.input,
              {
                color: Colors[colorScheme ?? "light"].text,
                borderBottomColor: Colors[colorScheme ?? "light"].text,
              },
            ]}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={onSignUpPress}
          >
            <MonoText style={styles.buttonText}>Sign Up</MonoText>
          </TouchableOpacity>
        </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            value={code}
            placeholder="Code..."
            placeholderTextColor={Colors[colorScheme ?? "light"].text}
            style={[
              styles.input,
              {
                color: Colors[colorScheme ?? "light"].text,
                borderBottomColor: Colors[colorScheme ?? "light"].text,
              },
            ]}
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={onPressVerify}
          >
            <MonoText style={styles.buttonText}>Verify Email</MonoText>
          </TouchableOpacity>
        </>
      )}
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
