// Homepage/Settings menu for the app
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, Switch, Appearance, useColorScheme, Pressable } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";
import SignOutButton from "@/contexts/sign-out";
import { FEATURES } from '@/constants/features';
import { useFeatures } from '@/contexts/FeatureContext';
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const colorScheme = useColorScheme();
  const { enabledFeatures, toggleFeature } = useFeatures();
  
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
            Features
            </Text>
            <SignOutButton />
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-4">

          {/* Dark mode toggle switch. This will set the color scheme to dark or light depending on the current state. */}
          <View className="flex-row items-center justify-end mt-3 mb-1">
            <Text className="text-xl dark:text-primary text-dark-100 font-bold">Dark Mode</Text>
            <Switch value={colorScheme=='dark'} 
              trackColor={{false: '#B5B5B5', true: '#AF52DE'}}
              thumbColor={isEnabled ? '#B416B1' : '#E5E5E5'}
              onChange={() => {
                Appearance.setColorScheme(colorScheme=='dark' ? 'light' : 'dark')
              }}
            />
          </View>
          
          {/* Button to reset to system default. This will set the color scheme to null, which is the system default. */}
          <View>
            <TouchableWithoutFeedback onPress={() => {
              Appearance.setColorScheme(null); // Resets to system default
              setIsEnabled(false); // Reset the toggle state
            }}>
              <View className="px-4 py-2 rounded-full bg-accent">
                <Text className="text-base dark:text-primary text-dark-100">System Default</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

        </View>

        {/* Box that encapsulates features. Includes a title, divider and features w/ descriptions and checkboxes. */}
        <View className="px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">
          Choose your desired features to customise your experience.
          </Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          <View>
            
            {/* Gets all features and lists them with an option to toggle their enabled state */}
            {FEATURES.map((feature) => (
              <View
                key={feature.id}
                className="flex-row items-center my-2"
              >
                <View className="flex-1">
                  <Text className="text-lg dark:text-primary text-dark-100">{feature.name}</Text>
                  <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{feature.description}</Text>
                </View>
                  <Switch
                    trackColor={{false: '#B5B5B5', true: '#AF52DE'}}
                    thumbColor={isEnabled ? '#B416B1' : '#E5E5E5'}
                    value={enabledFeatures[feature.id]}
                    onValueChange={() => toggleFeature(feature.id)}
                  />
              </View>
            ))}
          </View>
        </View>

        {/* Forgot Password Link */}
        <Link className="text-accent mb-32 mt-6 justify-center text-center text-lg" href="/reset-password/reset">
          Reset your password
        </Link>

      </ScrollView>
    </View>
  );
}
