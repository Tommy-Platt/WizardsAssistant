import { View, Text, TextInput, Pressable, ImageBackground, Image, ScrollView, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SignOutButton from '@/contexts/sign-out';
import { Dropdown } from 'react-native-element-dropdown';

const Dice = () => {

  const [modifier, setModifier]= useState(0);
  const [diceType, setDiceType] = useState(20);
  const [diceMultiplier, setDiceMultiplier] = useState(1);

  // Prevents the dice multiplier from exceeding 100
  const handleDiceMultiplier = (value: number) => {
    if (value > 100) {
      setDiceMultiplier(1);
      alert("Dice multiplier cannot exceed 100. Resetting to 1.");
    }
    else {
      setDiceMultiplier(value);
    }
  };

  const [selectedDice, setSelectedDice] = useState<number | null>(null);
  const [advantage, setAdvantage] = useState('none');

  const handleRoll = () => {

    var roll = 0;

    // Used for advantage/disadvantage rolls
    var roll1 = 0;
    var roll2 = 0;

    if (advantage === 'advantage') {
      // Rolls two dice and take the highest one
      roll1 = Math.floor(Math.random() * diceType) + 1;
      roll2 += Math.floor(Math.random() * diceType) + 1;

      roll += Math.max(roll1, roll2);
      roll += modifier;
      alert(`Roll: ${roll}. Best of ${roll1} and ${roll2} (+ ${modifier})`);

    }

    else if (advantage === 'disadvantage') {
      // Rolls two dice and take the lowest one
      roll1 = Math.floor(Math.random() * diceType) + 1;
      roll2 = Math.floor(Math.random() * diceType) + 1;

      roll += Math.min(roll1, roll2);
      roll += modifier;
      alert(`Roll: ${roll}. Worst of ${roll1} and ${roll2} (+ ${modifier})`);

    }

    else if (advantage === 'none') {
      // Rolls the dice based on the selected type and multiplier
      for (let i = 0; i < diceMultiplier; i++) {

        roll += Math.floor(Math.random() * diceType) + 1;
      }

      roll += modifier;
      alert(`Roll: ${roll}`)
      
    }
  }

  // In order for lightmode/darkmode to work for the custom dropdown, an if-else statement is used with custom styling for each
  const DropdownColour = ({colorScheme}: any) => {
      if(colorScheme === 'light') {
          return (
              <Dropdown
                data={[
                  { label: 'None', value: 'none' },
                  { label: 'Advantage', value: 'advantage' },
                  { label: 'Disadvantage', value: 'disadvantage' }
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={advantage}
                testID='advantageDropdown'
                placeholder={advantage}
                onChange={(item: { label: string; value: string }) => {
                  setAdvantage(item.value);
                }}
                style={{
                  backgroundColor: '#E5E5E5',
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 20,
                }}
                placeholderStyle={{ color: '#222222' }}
                selectedTextStyle={{ color: '#222222' }}
              />
          );
      } return (
          <Dropdown
            data={[
              { label: 'None', value: 'none' },
              { label: 'Advantage', value: 'advantage' },
              { label: 'Disadvantage', value: 'disadvantage' }
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={advantage}
            testID='advantageDropdown'
            placeholder={advantage}
            onChange={(item: { label: string; value: string }) => {
              setAdvantage(item.value);
            }}
            style={{
              backgroundColor: '#222222',
              borderRadius: 10,
              padding: 14,
              marginBottom: 20,
            }}
            placeholderStyle={{ color: '#F5F5F5' }}
            selectedTextStyle={{ color: '#F5F5F5' }}
          />
      );
      }

  return (
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
        <View className="mx-auto px-4 py-3 rounded-full dark:bg-dark-200 bg-light-200 mb-6">
          <View className="flex-row items-center self-stretch w-full justify-center">
              <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
                D&D Dice Roller
              </Text>
              <SignOutButton />
          </View>
        </View>

        {/* Dice rolling types are displayed by mapping over an array. Includes if-else logic for selected type styling. */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Dice Type</Text>
        <View className='flex-row items-center justify-center mb-6'>
          {[4, 6, 8, 10, 12, 20, 100].map((type) => (
            <Pressable key={type} onPress={() => { setSelectedDice(type); setDiceType(type); }}>
              <Text
                className={`text-base dark:text-primary text-dark-100 font-bold px-4 py-3 rounded-xl mx-1 ${
                  selectedDice === type
                    ? "bg-accent"
                    : "bg-light-200 dark:bg-dark-200"
                }`}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Numerical input for multiplying dice */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Dice Multiplier</Text>
        <TextInput className='px-5 py-3 bg-light-200 dark:bg-dark-200 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-2xl'
          keyboardType="numeric"
          value={String(diceMultiplier)}
          placeholder="Dice Multiplier"
          onChangeText={(text) => handleDiceMultiplier(Number(text))}
        />

        {/* Numerical input for modifier */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Modifier</Text>
        <TextInput className='px-5 py-3 bg-light-200 dark:bg-dark-200 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-2xl'
          keyboardType="numeric"
          value={String(modifier)}
          placeholder="Modifier"
          onChangeText={(text) => setModifier(Number(text))}
        />

        {/* Dropdown for advantage/disadvantage */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Advantage</Text>
        <View className='dark:bg-dark-100 bg-primary'>
          <DropdownColour colorScheme={useColorScheme()} />
        </View>

        {/* Roll button */}
        <Pressable onPress={() => {handleRoll()}}>
          <ImageBackground source={images.highlight} className="px-4 py-4 bg-accent rounded-full mx-1 mb-6 overflow-hidden items-center">
            <Text className='text-xl text-primary items'>Roll!</Text>
          </ImageBackground>
        </Pressable>
        
        </ScrollView>
      </View>
  )
}

export default Dice