import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  padded?: boolean;
  hasTabs?: boolean;
};

export const SafeAreaLayout = ({
  children,
  padded = false,
  hasTabs = false,
}: Props) => {
  return (
    <SafeAreaView
      className="flex-1 bg-beige"
      edges={
        hasTabs ? ["top", "left", "right"] : ["top", "right", "bottom", "left"]
      }
    >
      <View className={padded ? "flex-1 px-6" : "flex-1"}>{children}</View>
    </SafeAreaView>
  );
};
