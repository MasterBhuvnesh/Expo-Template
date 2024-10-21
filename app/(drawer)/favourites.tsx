import React, { useCallback, useMemo, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";
import QRCode from "react-qr-code";
import Colors from "@/constants/Colors";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export default function FavouritesScreen() {
  const colorScheme = useColorScheme();
  const size = 128;

  // Bottom Sheet Modal ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["15%", "40%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        style={[
          props.style,
          {
            backgroundColor:
              colorScheme === "dark"
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(0, 0, 0, 0.5)",
          },
        ]}
        blurAmount={colorScheme === "dark" ? 0 : 10}
      />
    ),
    [colorScheme]
  );

  // renders
  const renderContent = () => (
    <View
      style={[
        styles.contentContainer,
        {
          backgroundColor:
            colorScheme === "dark" ? "#202020" : Colors.light.background,
        },
      ]}
    >
      <MonoText style={{ textAlign: "center", marginBottom: 20 }}>
        Hey, Scan the QR code to view the linkedin profile 😊
      </MonoText>
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <QRCode
          size={size}
          bgColor={colorScheme === "dark" ? "#202020" : Colors.light.background}
          fgColor={Colors[colorScheme ?? "light"].text}
          level="L"
          value="https://www.linkedin.com/in/bhuvneshverma/"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MonoText style={styles.title}> This is Favourites Page </MonoText>
      <MonoText>[ app/(drawer)/favourites.tsx ]</MonoText>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePresentModalPress}
      >
        <Text style={styles.buttonText}>Open QR Code</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].text,
        }}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "dark" ? "#202020" : Colors.light.background,
        }}
        enablePanDownToClose={true}
      >
        {renderContent()}
      </BottomSheetModal>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
