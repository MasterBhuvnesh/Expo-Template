import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import React, { forwardRef, useMemo, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { MonoText } from "./StyledText";
import { View } from "./Themed";
import Colors from "@/constants/Colors";

export type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["20%", "50%"], []);
  const colorScheme = useColorScheme();

  // Close Button function however its not really required but can be used if needed
  const CloseBtn = () => {
    const { close } = useBottomSheet();

    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => close()}
        >
          <MonoText style={styles.buttonText}>Close Bottom Sheet</MonoText>
        </TouchableOpacity>
      </View>
    );
  };

  // Backdrop component to handle the backdrop of the bottom sheet
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
                ? "rgba(0, 0, 0, 0.5)" // semi-transparent black for dark mode
                : "rgba(0, 0, 0, 0.5)", // light blur for light mode
          },
        ]}
        blurAmount={colorScheme === "dark" ? 0 : 10}
      />
    ),
    [colorScheme]
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].text,
      }}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor:
          colorScheme === "dark" ? "#202020" : Colors.light.background,
      }}
      // You can use this to set the margin of the bottom sheet
      // style={{
      //   marginHorizontal: 10,
      // }}
    >
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor:
              colorScheme === "dark" ? "#202020" : Colors.light.background,
          },
        ]}
      >
        <MonoText>
          Bottom Modal - [ @components/CustomBottomSheetModal.tsx ]
        </MonoText>
        <MonoText style={{ fontSize: 12 }}>
          The Snap Points are: {snapPoints.join(", ")}
        </MonoText>
        <MonoText style={{ fontSize: 12, marginTop: 40, textAlign: "center" }}>
          given below is the close button. {`\n`}( not required you can just
          drag this to close but can be used if needed )
        </MonoText>
        <CloseBtn />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#007bff",
    padding: 10,
    width: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
});

export default CustomBottomSheetModal;
