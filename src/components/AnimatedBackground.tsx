import React, { useEffect } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function AnimatedBackground() {
  const { height } = useWindowDimensions();

  const top1 = useSharedValue(height * 0.2);
  const top2 = useSharedValue(height * 0.45);
  const top3 = useSharedValue(height * 0.7);

  useEffect(() => {
    const options = {
      duration: 4000,
      easing: Easing.bezier(0.5, 0, 0.5, 1),
    };

    top1.value = withRepeat(withTiming(height * 0.15, options), -1, true);
    top2.value = withDelay(
      1000,
      withRepeat(withTiming(height * 0.4, options), -1, true)
    );
    top3.value = withDelay(
      2000,
      withRepeat(withTiming(height * 0.65, options), -1, true)
    );
  }, []);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 items-center">
      <Animated.View
        className="w-[400%] absolute aspect-square bg-yellow-400 rounded-full"
        style={{ top: top1 }}
      />
      <Animated.View
        className="w-[400%] absolute aspect-square top-[50%] bg-yellow-300 rounded-full"
        style={{ top: top2 }}
      />
      <Animated.View
        className="w-[400%] absolute aspect-square top-[70%] bg-orange-500 rounded-full"
        style={{ top: top3 }}
      />
    </View>
  );
}
