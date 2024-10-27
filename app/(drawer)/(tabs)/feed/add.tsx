// import { StatusBar } from "expo-status-bar";
// import { Platform, StyleSheet, useColorScheme } from "react-native";
// import { View } from "@/components/Themed";
// import { MonoText } from "@/components/StyledText";
// import CopyButton from "@/components/Copy";
// import Colors from "@/constants/Colors";
// import { Stack } from "expo-router";
// export default function ModalScreen() {
//   const GitHubUrl = " https://github.com/MasterBhuvnesh/Expo-Template";

//   const colorScheme = useColorScheme();
//   return (
//     <View style={styles.container}>
//       <Stack.Screen
//         options={{
//           title: "Contact",
//           headerTitleStyle: {
//             fontSize: 14,
//             fontFamily: "SpaceMono",
//           },
// presentation: "modal",
// // presentation: "transparentModal",
//           animation: "fade",
//           headerShown: false,
//           headerTransparent: true,
//           contentStyle: {
//             marginHorizontal: 10,
//             marginVertical: "80%",
//             // aspectRatio: 1,
//             maxHeight: "50%",
//           },
//         }}
//       />
//       <MonoText style={styles.title}> This is Add Page </MonoText>
//       <MonoText>[ app/(drawer)/(tabs)/feed/add.tsx ]</MonoText>
//       <MonoText
//         style={{
//           marginTop: 10,
//           fontSize: 10,
//           padding: 10,
//           textAlign: "center",
//         }}
//       >
//         Its Just a Modal Screen
//       </MonoText>

//       <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });
import { MonoText } from "@/components/StyledText";
import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { View } from "@/components/Themed";

import { BarChart, PieChart } from "react-native-gifted-charts";
export default function Modal() {
  const colorScheme = useColorScheme();

  const barData = [
    { value: 250, label: "M" },
    { value: 500, label: "T", frontColor: "#177AD5" },
    { value: 500, label: "W", frontColor: "#177AD5" },
    { value: 745, label: "T" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ];
  return (
    <>
      <Stack.Screen
        options={{
          title: "GRAPH",
          headerTitleStyle: {
            fontSize: 14,
            fontFamily: "SpaceMono",
          },
          // presentation: "modal",
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
          headerTransparent: true,
        }}
      />
      <Animated.View
        entering={FadeIn}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#00000040",
        }}
      >
        {/* Dismiss modal when pressing outside */}
        <Link
          href={"/feed/new"}
          asChild
        >
          <Pressable style={StyleSheet.absoluteFill} />
        </Link>
        <Animated.View
          entering={SlideInDown}
          style={{
            width: "90%",
            aspectRatio: 1,
            // height: "50%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            gap: 20,
            backgroundColor:
              colorScheme === "dark" ? "#202020" : Colors.light.background,
          }}
        >
          <MonoText>GRAPH</MonoText>

          <View
            style={{
              backgroundColor:
                colorScheme === "dark" ? "#202020" : Colors.light.background,
            }}
          >
            <BarChart
              barWidth={20}
              stepHeight={15}
              barBorderRadius={5}
              frontColor="lightgray"
              backgroundColor={
                colorScheme === "dark" ? "#202020" : Colors.light.background
              }
              hideYAxisText={true}
              hideRules={true}
              data={barData}
              yAxisThickness={0}
              xAxisThickness={0}
              rulesType="dashed"
              initialSpacing={15}
              spacing={15}
              isAnimated
              animationDuration={1000}
              maxValue={800}
              noOfSections={8}
              xAxisLabelTextStyle={{
                fontFamily: "SpaceMono",
                fontSize: 10,
                color: colorScheme === "dark" ? "#fff" : "#000",
              }}
            />
          </View>
          {/* <Link href="/">
            <Text>← Go back</Text>
          </Link> */}
        </Animated.View>
      </Animated.View>
    </>
  );
}
