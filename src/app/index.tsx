import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import BtnPrimary from "@/components/ui/buttons/btn-primary/BtnPrimary";
import { HeadingOne } from "@/components/ui/texts/heading/HeadingOne";
import { ParagraphRegular } from "@/components/ui/texts/paragraph/ParagraphRegular";

export default function Landing() {
  const handleStart = () => {
    router.push("/tasks");
  };

  return (
    <SafeAreaView className="flex-1 bg-beige">
      <View className="flex-1 items-center justify-center px-3">
        <View className="mb-2">
          <HeadingOne>Tasky</HeadingOne>
        </View>

        <ParagraphRegular textAlign="text-center" color="text-gray-500">
          Organize your day at your own pace.
        </ParagraphRegular>

        <View className="mt-6 w-full">
          <BtnPrimary onPress={handleStart}>Get started</BtnPrimary>
        </View>
      </View>
    </SafeAreaView>
  );
}
