import { View, Text } from "react-native";
import { Meditation } from "@/types";

export default function MeditaionListItem({
  meditation,
}: {
  meditation: Meditation;
}) {
  return (
    <View className="p-5 border-2 border-gray-300 rounded-2xl">
      <Text className="font-semibold ">{meditation.title}</Text>
    </View>
  );
}
