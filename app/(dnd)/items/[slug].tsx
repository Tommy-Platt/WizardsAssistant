import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { icons } from "@/constants/icons";

const itemDetails = () => {
  // Gets the item slug from the route params
  const { slug } = useLocalSearchParams();
  const [item, setitem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const fetchitem = async () => {

    try {
      const response = await axios.get(`https://api.open5e.com/v1/magicitems/${slug}`);
      setitem(response.data);

    } catch (error) {
      // Display Open 5E API error
      console.error('Error fetching item details:', error);

    } finally {
    // End loading when finished the search
      setLoading(false);
    }

  }

  if (slug) fetchitem(); // Only call fetch request if slug exists
  }, [slug]);

  // If loading, display animated loading symbol
  if (loading) {
    return <ActivityIndicator size="large" className='mt-5' />;
  }

  // If item is not found, display error message
  if (!item) {
    return <Text className='dark:text-primary text-dark-100 items-center mt-12'>Item not found.</Text>;
  }

  return (
    
  // Main background view which can be scrolled.
  <View className="flex-1 dark:bg-dark-100 bg-primary">
    <ScrollView className="flex-1 px-5" 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
      
      <View className='items-center justify-between mt-1'>
        <Image 
          source={icons.logoTrans} 
          className="w-32 h-32 mt-1 mb-1 mx-auto"
          > 
        </Image>
      </View>
      
      {/* Information background box */}
      <View className="mt-1 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-1">
        <Text className="text-xl dark:text-primary text-dark-100 font-bold">{item.name}</Text>
        <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>

        {/* Item type */}
        <View className="flex-row items-center justify-between mb-6">

          <View className="flex-1">
            <Text className="text-lg text-accent">Type</Text>

            {(item.type) ? (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{item.type}</Text>

            ) : (
            <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
            )}
          </View>
          
          {/* Item rarity */}
          <View className="flex-1">
            <Text className="text-lg text-accent">Rarity</Text>

            {(item.rarity) ? (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1 capitalize">{item.rarity}</Text>

            ) : (
            <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
            )}
          </View>

        </View>
        
        {/* Requires attunement? */}
        <View className="flex-1 mb-6">
            <Text className="text-lg text-accent">Attunement</Text>

            {(item.requires_attunement) ? (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1 capitalize">{item.requires_attunement}</Text>

            ) : (
            <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
            )}
        </View>

        {/* Item description */}
        <Text className="text-lg text-accent">Description</Text>
        <View className="mt-2 px-4 py-3 rounded-xl dark:bg-dark-300 bg-light-300 mb-1">
        
          {(item.desc) ? (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{item.desc}</Text>

            ) : (
            <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
            )}

        </View>

        {/* Displays items's source (some are from external expansions to D&D) */}
        {(item.document__title) && (
          <Text className="text-lrg dark:text-light-300 text-dark-300 font-regular text-center mt-4 italic">Source - {item.document__title}</Text>
        )}

      </View>
    </ScrollView>
  </View>
  )
}

export default itemDetails