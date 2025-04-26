import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

const CardDetails = () => {
  const { id } = useLocalSearchParams(); // Get the card ID from the URL parameters
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCard = async () => {

      try {
        // Gets the UUID of the card selected from the card list, then sets the card data
        const response = await axios.get(`https://api.scryfall.com/cards/${id}`);
        setCard(response.data);

      } catch (error) {
        // Display Scryfall error
        console.error('Error fetching card details:', error);

      } finally {
      // End loading when finished the search
        setLoading(false);
      }

    }

  if (id) fetchCard(); // Only call fetch request if id exists
  }, [id]);

  // If loading, display animated loading symbol
  if (loading) {
    return <ActivityIndicator size="large" className='mt-5' />;
  }

  // If card is not found, display error message
  if (!card) {
    return <Text className='dark:text-primary text-dark-100 items-center mt-12'>Card not found.</Text>;
  }

  return (
    
    // Main background view which can be scrolled.
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>

        {/* Larger card image, retains MTG card ration based on width */}
        <Image source={{ uri: card.image_uris.normal }} className='self-center w-full aspect-[0.714] rounded-2xl mt-6'/>

        <View className='items-center justify-between mt-6'>

          {/* Card name and type (e.g. sorcery) */}
          <Text className='text-3xl dark:text-primary text-dark-100 font-bold'>{card.name}</Text>
          <Text className='text-xl text-accent font-semibold mb-6'>{card.type_line && `${card.type_line}`}</Text>

          {/* Card description + flavor text */}
          <View className='dark:bg-dark-200 bg-light-200 p-4 rounded-2xl self-stretch mb-6'>
            <Text className='text-2xl dark:text-light-300 text-dark-300'>{card.oracle_text && `${card.oracle_text}`}</Text>
            <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
            <Text className='text-xl text-accent italic'>{card.flavor_text && `${card.flavor_text}`}</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  )
}

export default CardDetails