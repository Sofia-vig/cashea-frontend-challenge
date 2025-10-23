import { ActivityIndicator, View } from "react-native";

export function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-beige dark:bg-night">
      <ActivityIndicator size="large" color="#A5B4FC" />
    </View>
  );
}
