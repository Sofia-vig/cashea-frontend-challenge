import { Stack } from "expo-router";
import { Platform, StatusBar, UIManager, View } from "react-native";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";

export default function RootLayout() {
  useFonts({
    DMsansRegular: DMSans_400Regular,
    DMsansBold: DMSans_700Bold,
  });

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <View className="flex-1 bg-beige">
      <StatusBar backgroundColor="#F7EFE7" barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F7EFE7" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
