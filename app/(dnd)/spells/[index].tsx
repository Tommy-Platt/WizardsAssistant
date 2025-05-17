import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { icons } from "@/constants/icons";

const SpellDetails = () => {
  // Gets the spell index from the route params
  const { index } = useLocalSearchParams();
  const [spell, setSpell] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSpell = async () => {

      try {
        const response = await axios.get(`https://www.dnd5eapi.co/api/2014/spells/${index}`);
        setSpell(response.data);

      } catch (error) {
        // Display D&D 5E API error
        console.error('Error fetching spell details:', error);

      } finally {
      // End loading when finished the search
        setLoading(false);
      }

    }

  if (index) fetchSpell(); // Only call fetch request if id exists
  }, [index]);

  // If loading, display animated loading symbol
  if (loading) {
    return <ActivityIndicator size="large" className='mt-5' />;
  }

  // If spell is not found, display error message
  if (!spell) {
    return <Text className='dark:text-primary text-dark-100 items-center mt-12'>Spell not found.</Text>;
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
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">{spell.name}</Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>

          {/* Spell level requirement + Spell casting time */}
          <View className="flex-row items-center justify-between mb-6">

            <View className="flex-1">
              <Text className="text-lg text-accent">Level</Text>

              {(spell.level) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.level}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>
            

            <View className="flex-1">
              <Text className="text-lg text-accent">Casting Time</Text>

              {(spell.casting_time) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.casting_time}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>

          </View>

          {/* Spell range/area + Spell components (split by commas) */}
          <View className="flex-row items-center justify-between mb-6">

            <View className="flex-1">
              <Text className="text-lg text-accent">Range/Area</Text>

              {(spell.range) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.range}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="text-lg text-accent">Components</Text>

              {(spell.components) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.components.join(', ')}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>
          </View>

          {/* Spell duration + Spell school */}
          <View className="flex-row items-center justify-between mb-6">

            <View className="flex-1">
              <Text className="text-lg text-accent">Duration</Text>

              {(spell.duration) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.duration}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="text-lg text-accent">School</Text>

              {(spell.school.name) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.school.name}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>
          </View>

          {/* Attack/Save type + Damage/Effect type */}
          <View className="flex-row items-center justify-between mb-6">

            <View className="flex-1">
              <Text className="text-lg text-accent">Attack/Save</Text>

              {(spell.attack_type || spell.dc?.dc_type?.name) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">
                  {spell.attack_type ? spell.attack_type : spell.dc?.dc_type?.name}
                </Text>
              ) : (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="text-lg text-accent">Damage/Effect</Text>

              {(spell.damage) ? (
                <Text className="text-base dark:text-light-100 text-dark-200 mt-1">{spell.damage.damage_type.name}</Text>

              ) : (
              <Text className="text-base dark:text-light-100 text-dark-200 mt-1">-</Text>
              )}
            </View>
          </View>

          {/* Description box + Higher level casting details */}
          <Text className="text-lg text-accent">Description</Text>
            <View className="mt-2 px-4 py-3 rounded-xl dark:bg-dark-300 bg-light-300 mb-1">

              {/* Displays spell's description component, separating the array to render correctly */}
              {spell.desc.map((paragraph: string, idx: number) => (
                <Text key={idx} className="text-lrg dark:text-primary text-dark-100 font-regular text-left mb-2">
                  {paragraph}
                </Text>
              ))}

              {/* Displays spell's higher level casting component, separating the array to render correctly */}
              {spell.higher_level && spell.higher_level.map((text: string, idx: number) => (
                <Text key={idx} className="text-lrg dark:text-primary text-dark-100 font-regular text-left mt-4">
                  {text}
                </Text>
              ))}
            </View>

          {/* Displays spell's material component if it has one */}
          {(spell.material) && (
            <Text className="text-lrg dark:text-light-300 text-dark-300 font-regular text-center mt-4 italic">Material - {spell.material}</Text>
          )}

        </View>
      </ScrollView>
    </View>
  )
}

export default SpellDetails