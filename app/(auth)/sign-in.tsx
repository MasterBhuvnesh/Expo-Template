import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
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

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        // router.replace("/");
        router.dismissAll();
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      ToastAndroid.show(err.errors[0].message, ToastAndroid.SHORT);
    }
  }, [isLoaded, emailAddress, password]);

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
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
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
        onPress={onSignInPress}
      >
        <MonoText style={styles.buttonText}>Sign In</MonoText>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 10,
        }}
      >
        <MonoText style={{ fontSize: 12, textAlign: "center" }}>
          Don't have an account?
        </MonoText>
        <Link href="/sign-up">
          <MonoText
            style={{ color: "#007bff", fontSize: 12, textAlign: "center" }}
          >
            Sign up
          </MonoText>
        </Link>
      </View>
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
