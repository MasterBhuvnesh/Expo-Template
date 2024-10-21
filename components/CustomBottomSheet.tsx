import { StyleSheet, useColorScheme } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { View } from "./Themed";
import { MonoText } from "./StyledText";
import Colors from "../constants/Colors";

export type Ref = BottomSheet;

interface Props {
  title: string;
  style?: StyleSheet;
}
/*
// Close Button
const CloseBtn = () => {
  const { close } = useBottomSheet();

  return (
    <Button
      title="Close"
      onPress={() => close()}
    />
  );
};
*/

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["10%", "25%"], []);
  const colorScheme = useColorScheme();

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
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].text,
      }}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor:
          colorScheme === "dark" ? "#202020" : Colors.light.background,
      }}
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
        <MonoText style={{ fontSize: 12, textAlign: "center" }}>
          Custom Bottom Sheet - {`\n`}[ @components/CustomBottomSheet.tsx ]
        </MonoText>
        {props.title && (
          <MonoText style={{ fontSize: 12, textAlign: "center" }}>
            {props.title}
          </MonoText>
        )}
        {/* <CloseBtn /> */}
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor:
              colorScheme === "dark" ? "#202020" : Colors.light.background,
          },
        ]}
      >
        <MonoText style={styles.footerText}>
          The Snap Points are: {snapPoints.join(", ")}
        </MonoText>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  footer: {
    padding: 10,
  },
  footerText: {
    fontSize: 10,
    textAlign: "center",
  },
});

export default CustomBottomSheet;
