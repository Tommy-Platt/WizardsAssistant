// D&D menu for the app
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

export default function DND() {
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
              D&D Tools
              </Text>
              <Image source={icons.account} className="size-8 -ml-8"></Image>
          </View>
        </View>

        {/* Box that encapsulates tools. Tapping the names of tools redirects to their page */}
        <View className="mt-10 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">
          Tools
          </Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          <View>
            
            {/* D&D Items listing */}   
            <Pressable onPress={() => router.push('/(dnd)/items')}>
                <View className="flex-row items-center my-2">
                <Image source={icons.items} className="w-6 h-6 mr-4"></Image>
                  <View className="flex-1">
                    <Text className="text-lg dark:text-primary text-dark-100">D&D Items</Text>
                    <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Search all D&D 5E (base game) items!</Text>
                  </View>
                </View>
            </Pressable>

            {/* D&D Spells listing */}   
            <Pressable onPress={() => router.push('/(dnd)/spells')}>
                <View className="flex-row items-center my-2">
                <Image source={icons.spells} className="w-6 h-6 mr-4"></Image>
                  <View className="flex-1">
                    <Text className="text-lg dark:text-primary text-dark-100">D&D Spells</Text>
                    <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Search all D&D 5E (base game) spells!</Text>
                  </View>
                </View>
            </Pressable>

            {/* D&D Session Summary listing */}
            <Pressable onPress={() => router.push('/(dnd)/session')}>
                <View className="flex-row items-center my-2">
                <Image source={icons.session} className="w-6 h-6 mr-4"></Image>
                  <View className="flex-1">
                    <Text className="text-lg dark:text-primary text-dark-100">D&D Session Summaries</Text>
                    <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Document your latest campaign session.</Text>
                  </View>
                </View>
            </Pressable>
            
            {/* D&D Dice Roller listing */}
            <Pressable onPress={() => router.push('/(dnd)/dice')}>
                <View className="flex-row items-center my-2">
                <Image source={icons.dice} className="w-6 h-6 mr-4"></Image>
                  <View className="flex-1">
                    <Text className="text-lg dark:text-primary text-dark-100">D&D Dice Roller</Text>
                    <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Custom options for dice rolling.</Text>
                  </View>
                </View>
            </Pressable>             
          </View>
        </View>

      <View className="flex-1 items-center justify-center -mt-20">
        <Image 
          source={images.dndLarge} 
          className="w-full h-auto max-w-md" 
          resizeMode="contain"
        />
      </View>

      </ScrollView>
    </View>
  );
}