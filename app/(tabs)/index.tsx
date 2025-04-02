// Homepage/Settings menu for the app
import { Text, View, Image, ScrollView, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";

export default function Index() {
  const [checkedStates, setCheckedStates] = useState([false, false, false]);

  return (
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        <Image 
        source={icons.logoTrans} 
        className="w-32 h-32 mt-6 mb-1 mx-auto"
        > 
        </Image>

        <View className="mx-auto px-4 py-3 rounded-full dark:bg-dark-200 bg-secondary">
            <View className="flex-row items-center self-stretch w-full justify-center">
                <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
                Features
                </Text>
                <Image source={icons.settings} className="size-8 -ml-8"></Image>
            </View>
        </View>

        <View className="my-16 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-secondary">
            <Text className="text-xl dark:text-primary text-dark-100 font-bold">
            Features
            </Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          <View>
            <View className="flex-row items-center my-2">
              <Text className="text-lg dark:text-primary text-dark-100 flex-1">Feature 1</Text>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[0] = !newStates[0]; // Update index 0 for Feature 1
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[0] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>
            <View className="flex-row items-center my-2">
              <Text className="text-lg dark:text-primary text-dark-100 flex-1">Feature 2</Text>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[1] = !newStates[1]; // Update index 1 for Feature 2
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[1] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>
            <View className="flex-row items-center my-2">
              <Text className="text-lg dark:text-primary text-dark-100 flex-1">Feature 3</Text>
              <TouchableWithoutFeedback onPress={() => {
                const newStates = [...checkedStates];
                newStates[2] = !newStates[2]; // Update index 2 for Feature 3
                setCheckedStates(newStates);
              }}>
                <Image 
                  source={checkedStates[2] ? icons.checkbox : icons.checkboxUnchecked} 
                  className="w-6 h-6" 
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </ScrollView>
      <Text>Test</Text>
    </View>
  );
}
