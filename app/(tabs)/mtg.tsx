// MTG menu for the app
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SignOutButton from "@/contexts/sign-out";
import { Link } from 'expo-router';
import { FEATURES } from '@/constants/features';
import { useFeatures } from '@/contexts/FeatureContext';
import { useRouter } from "expo-router";

export default function MTG() {
  const router = useRouter();
  const { enabledFeatures } = useFeatures();

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
            <Pressable onPress={() => router.back()}>
              <Image source={icons.back} className="size-8" />
            </Pressable>
            <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
            MTG Tools
            </Text>
            <SignOutButton />
          </View>
        </View>

        {/* Box that encapsulates tools. Tapping the names of tools redirects to their page */}
        <View className="mt-10 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-1">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">
          Tools
          </Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          <View>
            
            {/* Maps through the MTG features and displays them if they are enabled */}
            {FEATURES.slice(4, 6).map((feature) => 
              enabledFeatures[feature.id] ? (
                <Link
                  key={feature.id}
                  href={feature.route as any}
                  asChild
                >
                  <Pressable>
                    <View className="flex-row items-center my-2">
                      <Image source={feature.icon} className="w-6 h-6 mr-4"></Image>
                      <View className="flex-1">
                        <Text className="text-lg dark:text-primary text-dark-100">{feature.name}</Text>
                        <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{feature.description}</Text>
                      </View>
                    </View>
                  </Pressable>
                </Link>
              ) : null
            )}

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