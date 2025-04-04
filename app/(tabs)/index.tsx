// Homepage/Settings menu for the app
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, Switch, Appearance, useColorScheme } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";

export default function Index() {
  const [checkedStates, setCheckedStates] = useState([false, false, false, false, false, false]);
  const [isEnabled, setIsEnabled] = useState(false);
  const colorScheme = useColorScheme();

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
              Features
              </Text>
              <Image source={icons.account} className="size-8 -ml-8"></Image>
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
        <View className="px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-36">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">
          Choose your desired features to customise your experience.
          </Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          <View>
            
            {/* D&D Items listing */}   
            <View className="flex-row items-center my-2">
              <View className="flex-1">
                <Text className="text-lg dark:text-primary text-dark-100">D&D Items</Text>
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Search all D&D 5E (base game) items!</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[0] = !newStates[0];
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[0] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>

            {/* D&D Spells listing */}
            <View className="flex-row items-center my-2">
              <View className="flex-1">
                <Text className="text-lg dark:text-primary text-dark-100">D&D Spells</Text>
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Search all D&D 5E (base game) spells!</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[1] = !newStates[1];
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[1] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>

            {/* D&D Session Summary listing */}
            <View className="flex-row items-center my-2">
              <View className="flex-1">
                <Text className="text-lg dark:text-primary text-dark-100">D&D Session Summaries</Text>
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Document your latest campaign session.</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[2] = !newStates[2];
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[2] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>

            {/* D&D Dioe Roller listing */}
            <View className="flex-row items-center my-2">
              <View className="flex-1">
                <Text className="text-lg dark:text-primary text-dark-100">D&D Dice Roller</Text>
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Custom options for dice rolling.</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[3] = !newStates[3];
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[3] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>

            {/* MTG Cards listing */}
            <View className="flex-row items-center my-2">
              <View className="flex-1">
                <Text className="text-lg dark:text-primary text-dark-100">MTG Cards</Text>
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Search all MTG cards!</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[4] = !newStates[4];
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[4] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>

            {/* MTG Health Tracker listing */}
            <View className="flex-row items-center my-2">
              <View className="flex-1">
                <Text className="text-lg dark:text-primary text-dark-100">Player Health Tracker</Text>
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">Track HP for MTG. Supports multiplayer.</Text>
              </View>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[5] = !newStates[5];
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[5] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
