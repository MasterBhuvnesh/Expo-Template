import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import { Link, useRouter } from "expo-router";

export default function BlogScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#007bff"
        />
        <MonoText style={styles.loadingText}>Loading Blog...</MonoText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is Blog Page </MonoText>
      <MonoText>[ app/blog/index.tsx ]</MonoText>
      <MonoText style={{ marginVertical: 10, textAlign: "center" }}>
        The button below will push to the blog page with the id and author
        params .
      </MonoText>
      <MonoText> Implementing dynamic routing.</MonoText>
      <View style={{ marginTop: 20, gap: 10 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/blog/1")}
        >
          <MonoText style={styles.buttonText}>Go To Blog page No. 1</MonoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/blog/100")}
        >
          <MonoText style={styles.buttonText}>Go To Blog page No. 100</MonoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/blog/[id]",
              params: { id: "999", author: "john" },
            })
          }
        >
          <MonoText style={styles.buttonText}>
            Go To Blog page No. 999 written by john
          </MonoText>
        </TouchableOpacity>

        <Link
          href={{
            pathname: "/blog/[id]",
            params: { id: "4", author: "Jenny" },
          }}
        >
          <View style={styles.button}>
            <MonoText style={styles.buttonText}>
              Go to blog written by Jenny
            </MonoText>
          </View>
        </Link>
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
    paddingHorizontal: 20,
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
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
});
