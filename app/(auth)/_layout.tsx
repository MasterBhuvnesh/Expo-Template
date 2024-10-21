import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function UnAuthenticatedLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

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
