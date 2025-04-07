// MTG menu for the app
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

export default function MTG() {
  const router = useRouter();

  return (
    // Main background view which can be scrolled.
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        
        {/* Logo and title in a pill container w/ icon */}
        <Image 
        source={icons.logoTrans} 
        className="w-32 h-32 mt-1 mb-1 mx-auto"
        > 
        </Image>
        <View className="mx-auto px-4 py-3 rounded-full dark:bg-dark-200 bg-light-200">
          <View className="flex-row items-center self-stretch w-full justify-center">
              <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
              MTG Tools
              </Text>
              <Image source={icons.account} className="size-8 -ml-8"></Image>
          </View>
        </View>

        {/* Box that encapsulates tools. Tapping the names of tools redirects to their page */}
        <View className="mt-10 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-1">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">
          Tools
          </Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          <View>
            
            {/* MTG Cards listing */}
            <Pressable onPress={() => router.push('/(mtg)/cards')}>
                <View className="flex-row items-center my-2">
                <Image source={icons.mtgCards} className="w-6 h-6 mr-4"></Image>
                  <View className="flex-1">
                    <Text className="text-lg dark:text-primary text-dark-100">MTG Cards</Text>
                    <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Search all MTG cards!</Text>
                  </View>
                </View>
            </Pressable>

            {/* MTG Health Tracker listing */}
            <Pressable onPress={() => router.push('/(mtg)/health')}>
                <View className="flex-row items-center my-2">
                <Image source={icons.mtgHealth} className="w-6 h-6 mr-4"></Image>
                  <View className="flex-1">
                    <Text className="text-lg dark:text-primary text-dark-100">MTG Health Tracker</Text>
                    <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Track HP for MTG. Supports multiplayer.</Text>
                  </View>
                </View>
            </Pressable>

          </View>
        </View>

      <View className="flex-1 items-center justify-center">
        <Image 
          source={images.mtgLarge} 
          className="w-full h-auto max-w-md" 
          resizeMode="contain"
        />
      </View>

      </ScrollView>
    </View>
  );
}