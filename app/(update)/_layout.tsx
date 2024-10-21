import { Stack } from "expo-router";

export default function UpdateLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: "SpaceMono",
        },
      }}
    />
  );
}
