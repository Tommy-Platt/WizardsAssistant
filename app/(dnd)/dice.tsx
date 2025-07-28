import { View, Text, TextInput, Pressable, ImageBackground, Image, ScrollView, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SignOutButton from '@/contexts/sign-out';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';

const Dice = () => {
  const router = useRouter();

  const [modifier, setModifier]= useState(0);
  const [modifierInput, setModifierInput] = useState("0");
  const [diceType, setDiceType] = useState(20);
  const [multiplierInput, setMultiplierInput] = useState("1");

  const [selectedDice, setSelectedDice] = useState<number | null>(null);
  const [advantage, setAdvantage] = useState('none');

  const handleRoll = () => {
    let roll = 0;
    let rollTotal = 0;
    let roll1 = 0;
    let roll2 = 0;

    // Converts the multiplier and modifier inputs to numbers, ensuring they are valid
    const parsedMultiplier = /^\d+$/.test(multiplierInput)
      ? Math.min(parseInt(multiplierInput, 10), 100)
      : 1;

    const parsedModifier = /^-?\d+$/.test(modifierInput)
      ? parseInt(modifierInput, 10)
      : 0;

    if (advantage === 'advantage') {
      // If the user selects advantage, roll two dice and take the higher value
      if (parsedMultiplier !== 1) {
        alert("Advantage rolls do not support dice multipliers. Resetting to 1.");
        setMultiplierInput("1");
      } else {
        
        roll1 = Math.floor(Math.random() * diceType) + 1;
        roll2 = Math.floor(Math.random() * diceType) + 1;

        roll += Math.max(roll1, roll2);
        roll += parsedModifier;
        alert(`Roll: ${roll}. Best of ${roll1} and ${roll2} (+ ${parsedModifier})`);
      }

    } else if (advantage === 'disadvantage') {
      // If the user selects disadvantage, roll two dice and take the lower value
      if (parsedMultiplier !== 1) {
        alert("Disadvantage rolls do not support dice multipliers. Resetting to 1.");
        setMultiplierInput("1");
      } else {

        roll1 = Math.floor(Math.random() * diceType) + 1;
        roll2 = Math.floor(Math.random() * diceType) + 1;

        roll += Math.min(roll1, roll2);
        roll += parsedModifier;
        alert(`Roll: ${roll}. Worst of ${roll1} and ${roll2} (+ ${parsedModifier})`);
      }

    } else {
      // If no advantage or disadvantage is selected, roll the dice normally
      for (let i = 0; i < parsedMultiplier; i++) {
        roll += Math.floor(Math.random() * diceType) + 1;
      }

      rollTotal = roll + parsedModifier;
      alert(`Roll: ${rollTotal}. From ${roll} (+ ${parsedModifier}). (${parsedMultiplier}d${diceType})`);
    }
  };

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
    }
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

        <Image 
          source={icons.logoTrans} 
          className="w-32 h-32 mt-1 mb-1 mx-auto"
        />

        <View className="mx-auto px-4 py-3 rounded-full dark:bg-dark-200 bg-light-200 mb-6">
          <View className="flex-row items-center self-stretch w-full justify-center">
            <Pressable onPress={() => router.back()}>
              <Image source={icons.back} className="size-8" />
            </Pressable>
            <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
              D&D Dice Roller
            </Text>
            <SignOutButton />
          </View>
        </View>

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

        {/* Dice Multiplier Input */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Dice Multiplier</Text>
        <TextInput
          className='px-5 py-3 bg-light-200 dark:bg-dark-200 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-2xl'
          keyboardType="numeric"
          value={multiplierInput}
          testID='Multiplier'
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              if (parseInt(text, 10) > 100) {
                alert("Dice multiplier cannot exceed 100. Resetting to 1.");
                setMultiplierInput("1");
              } else {
                setMultiplierInput(text);
              }
            }
          }}
          // If user leaves the input empty, reset to 0
          onBlur={() => {
            if (multiplierInput === "") {
              setMultiplierInput("1");
            }
          }}
        />

        {/* Modifier Input */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Modifier</Text>
        <TextInput
          className='px-5 py-3 bg-light-200 dark:bg-dark-200 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-2xl'
          keyboardType="default"
          value={modifierInput}
          testID='Modifier'
          onChangeText={(text) => {
            if (/^-?\d*$/.test(text)) {
              setModifierInput(text);

              const number = parseInt(text, 10);
              if (!isNaN(number)) {
                setModifier(number);
              }
            }
          }}
          // If user leaves the input empty, reset to 0
          onBlur={() => {
            if (modifierInput === "") {
              setModifierInput("0");
            }
          }}
        />

        {/* Advantage Dropdown */}
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Advantage</Text>
        <View className='dark:bg-dark-100 bg-primary'>
          <DropdownColour colorScheme={useColorScheme()} />
        </View>

        {/* Roll Button */}
        <Pressable onPress={handleRoll}>
          <ImageBackground source={images.highlight} className="px-4 py-4 bg-accent rounded-full mx-1 mb-6 overflow-hidden items-center">
            <Text className='text-xl text-primary items'>Roll!</Text>
          </ImageBackground>
        </Pressable>

      </ScrollView>
    </View>
  );
};

export default Dice;