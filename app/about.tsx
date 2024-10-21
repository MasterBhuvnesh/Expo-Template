import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
export default function AboutScreen() {
  const router = useRouter();
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is About Page </MonoText>
      <MonoText>[ app/about.tsx ]</MonoText>
      {user && (
        <MonoText
          style={{
            fontSize: 10,
            textAlign: "left",
            marginVertical: 40,
            borderBottomColor: "#007bff",
            borderTopColor: "#007bff",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            paddingVertical: 15,
          }}
        >
          First Name : {user?.firstName} {"\n"}
          Last Name : {user?.lastName} {"\n"}
          User Email : {user?.emailAddresses[0].emailAddress} {"\n"}
          {/* User ID : {user?.id} {"\n"} */}
          {/* User Image : {user?.imageUrl} {"\n"} */}
          Username : {user?.username} {"\n"}
          Created At : {user?.createdAt?.toLocaleString()} {"\n"}
          Last Sign In At : {user?.lastSignInAt?.toLocaleString()}
        </MonoText>
      )}
      <View style={{ marginTop: 20 }}>
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
