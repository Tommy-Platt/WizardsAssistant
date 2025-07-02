import { View, Text, TextInput, Pressable, ImageBackground} from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images';

const Dice = () => {

  const [modifier, setModifier]= useState(0);
  const [diceType, setDiceType] = useState(20);
  const [diceMultiplier, setDiceMultiplier] = useState(1);
  const [selectedDice, setSelectedDice] = useState<number | null>(null);

  const handleRoll = () => {

    console.log(`Rolling ${diceMultiplier}d${diceType} + ${modifier}`);

    var roll = 0;

    for (let i = 0; i < diceMultiplier; i++) {

      roll += Math.floor(Math.random() * diceType) + 1;

    }

    roll += modifier;
    alert(`${roll}`)

  }

  return (
    <View className="flex-1 dark:bg-dark-100 bg-primary items-center justify-center">
      <View className="flex-1 flex-column mt-6 items-center">
        
        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Dice Type</Text>
        <View className='flex-row items-center justify-center mb-6'>
          {[4, 6, 8, 10, 12, 20].map((type) => (
            <Pressable key={type} onPress={() => { setSelectedDice(type); setDiceType(type); }}>
              <Text
                className={`text-lg dark:text-primary text-dark-100 font-bold px-4 py-3 rounded-xl mx-1 ${
                  selectedDice === type
                    ? "bg-accent"
                    : "bg-light-200 dark:bg-dark-200"
                }`}
              >
                d{type}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Dice Multiplier</Text>
        <TextInput className='px-5 py-3 bg-light-200 dark:bg-dark-200 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-2xl'
          keyboardType="numeric"
          value={String(diceMultiplier)}
          onChangeText={(text) => setDiceMultiplier(Number(text))}
        />

        <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Modifier</Text>
        <TextInput className='px-5 py-3 bg-light-200 dark:bg-dark-200 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-2xl'
          keyboardType="numeric"
          value={String(modifier)}
          onChangeText={(text) => setModifier(Number(text))}
        />

        <Pressable onPress={() => {handleRoll()}}>
          <ImageBackground source={images.highlight} className="px-4 py-4 bg-accent rounded-xl mx-1 mb-6 overflow-hidden">
            <Text className='text-xl text-primary'>Roll</Text>
          </ImageBackground>
        </Pressable>

      </View>
    </View>
  )
}

export default Dice