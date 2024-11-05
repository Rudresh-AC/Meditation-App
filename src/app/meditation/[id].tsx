import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

import { meditations } from "@/data";

import audio from "@assets/meditation/audio1.mp3";

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const player = useAudioPlayer(audio);
  const status = useAudioPlayerStatus(player);

  const meditation = meditations.find((m) => m.id === Number(id));

  const formatSecounds = (millisecounds: number) => {
    const minutes = Math.floor(millisecounds / 60000);
    const seconds = Math.floor((millisecounds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!meditation) {
    return <Text>Medatation Not found</Text>;
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-2 justify-between">
      {/* Page content */}
      <View className="flex-1">
        {/* Top part of the screen */}
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-center p-10">
            <AntDesign name="infocirlceo" size={24} color="black" />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Today's meditation
              </Text>
            </View>

            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={26}
              color="black"
            />
          </View>

          <Text className="text-3xl  mt-20 text-zinc-800  text-center font-semibold ">
            {meditation?.title}
          </Text>
        </View>

        {/* play/pause Button */}

        <Pressable
          onPress={() => (player.playing ? player.pause() : player.play())}
          className="bg-zinc-800 self-center  rounded-full aspect-square w-20 justify-center items-center"
        >
          <FontAwesome6
            name={status.playing ? "pause" : "play"}
            size={24}
            color="snow"
          />
        </Pressable>

        {/* Bottom part of the screen */}
        <View className="flex-1">
          {/* Footer player */}
          <View className="p-5 mt-auto gap-5">
            <View className="flex-row justify-between">
              <MaterialIcons name="airplay" size={24} color="#3A3937" />
              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="#3A3937"
              />
            </View>

            {/* Playback indicator */}
            <View>
              {/* <View className="bg-zinc-400 h-2" /> */}
              <Slider
                style={{ width: "100%", height: 3 }}
                value={status.currentTime / status.duration}
                onSlidingComplete={(value) =>
                  player.seekTo(value * status.duration)
                }
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#3A3937"
                maximumTrackTintColor="#3A393755"
                thumbTintColor="#3A3937"
              />
            </View>
            {/* Times */}
            <View className="flex-row justify-between">
              <Text>{formatSecounds(status.currentTime)}</Text>
              <Text>{formatSecounds(status.duration)}</Text>
              {/* <Text>13:24</Text> */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
