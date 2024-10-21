import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { MonoText } from "@/components/StyledText";

// Bottom Modal modules required for this page
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import CustomBottomSheetModal from "@/components/CustomBottomSheetModal";

export default function TabOneScreen() {
  // Bottom Modal constant | functions required for this page
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

  return (
    <View style={styles.container}>
      <CustomBottomSheetModal ref={bottomSheetRef} />
      <MonoText style={styles.title}> This is Feed Page </MonoText>
      <MonoText>[ app/(drawer)/(tabs)/feed/index.tsx ]</MonoText>

      {/* Button to open the bottom modal */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePresentModalPress}
        >
          <MonoText style={styles.buttonText}>Open Bottom Modal</MonoText>
        </TouchableOpacity>
      </View>
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
    textAlign: "center",
    padding: 10,
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
