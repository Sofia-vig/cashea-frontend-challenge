import { ANIM } from "constants/tasks";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useSlideUp(visible: boolean) {
  const translateY = useRef(new Animated.Value(ANIM.startOffset)).current;

  useEffect(() => {
    if (visible) {
      translateY.setValue(ANIM.startOffset);
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIM.openDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [translateY, visible]);

  const slideDown = (cb?: () => void) => {
    Animated.timing(translateY, {
      toValue: ANIM.endOffset,
      duration: ANIM.closeDuration,
      useNativeDriver: true,
    }).start(() => cb?.());
  };

  return { translateY, slideDown };
}
