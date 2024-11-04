import { Link, router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { meditations } from "@/data";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { top } = useSafeAreaInsets();

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Medatation Not found</Text>;
  }

  return (
    <SafeAreaView>
      <Text className="text-3xl ">{meditation?.title}</Text>
      <AntDesign
        onPress={() => router.back()}
        className="absolute right-4"
        name="close"
        style={{ top: top + 16 }}
        size={24}
        color="black"
      />
    </SafeAreaView>
  );
}
