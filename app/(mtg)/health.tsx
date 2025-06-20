import { View, Text, ScrollView, Pressable, Modal, Image, Animated, ImageBackground } from 'react-native'
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React, { useState, useRef } from 'react'

const Health = () => {

  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;
  const opacity3 = useRef(new Animated.Value(1)).current;
  const opacity4 = useRef(new Animated.Value(1)).current;
 
  const fade = (animatedValue: Animated.Value, toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };


  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const startingHealth = 40; // Will change later

  const playerCount = 4; // Will change later
  const [health, setHealth] = useState(Array(playerCount).fill(startingHealth)); // Each array index filled with starting health

  const [size, setSize] = useState({ width: 0, height: 0 }); // Size of pressable box is required for the components to work properly

  // Layout of boxes is manually determined as React Native fails to measure Pressable components correctly
  const handleLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  const handlePress = (index: number) => (event: any) => {
    const { locationY } = event.nativeEvent; // Y location corresponds to left or right of the health box

    setHealth((prev) => {
      // Update health based on pressing the left or right side of the box
      return prev.map((health, i) => {
        if (i !== index) return health; // Health stays the same for other players
        if (!size.height) return health; // Prevent update if height is not measured yet
        if (locationY < size.height / 2) {
          return health + 1;
        } else {
          return health - 1;
        }
      });
    });
  };

  // 2D array for commander damage: commanderDamage[target][source]
  const [commanderDamage, setCommanderDamage] = useState(Array(playerCount).fill(null).map(() => Array(playerCount).fill(0)));

  const [selectedPlayer, setSelectedPlayer] = useState(0); // The player who takes the commander damage

  const handleCommanderPress = (sourcePlayer: number) => (event: any) => {
    
    const { locationY } = event.nativeEvent;

    setCommanderDamage(prev => {
      return prev.map((row, i) => {
        if (i !== selectedPlayer) return row; // Only updates selected player damage
        return row.map((damage, j) => {
          if (j !== sourcePlayer) return damage; // Only update damage from the source player who deals it
          if (!size.height) return damage;
          if (locationY < size.height / 2) {
          return damage + 1;
        } else {
          return damage - 1;
        }
        });
      });
    });
  };

  return (
    <View className="flex-1 dark:bg-dark-100 bg-primary items-center justify-center">
      <ScrollView className="flex-1 px-5" 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        <View className="flex-1 flex-wrap flex-row mt-6">
          
          <Animated.View style={{ opacity: opacity1 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity1, 0.5)} onPressOut={() => fade(opacity1, 1)} onPress={handlePress(0)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl dark:text-primary text-dark-100 rotate-90">+ {health[0]} -</Text>
                <View className="flex-row w-full justify-start items-center absolute">
                  <Text className='text-xl dark:text-light-300 text-dark-300 rotate-90'>Player 1</Text>
                </View>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ opacity: opacity2 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity2, 0.5)} onPressOut={() => fade(opacity2, 1)} onPress={handlePress(1)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl dark:text-primary text-dark-100 -rotate-90">- {health[1]} +</Text>
              <View className="flex-row w-full justify-end items-center absolute">
                <Text className='text-xl dark:text-light-300 text-dark-300 -rotate-90'>Player 2</Text>
              </View>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ opacity: opacity3 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity3, 0.5)} onPressOut={() => fade(opacity3, 1)} onPress={handlePress(2)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl dark:text-primary text-dark-100 rotate-90">+ {health[2]} -</Text>
              <View className="flex-row w-full justify-start items-center absolute">
                <Text className='text-xl dark:text-light-300 text-dark-300 rotate-90'>Player 3</Text>
              </View>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ opacity: opacity4 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity4, 0.5)} onPressOut={() => fade(opacity4, 1)} onPress={handlePress(3)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl dark:text-primary text-dark-100 -rotate-90">- {health[3]} +</Text>
              <View className="flex-row w-full justify-end items-center absolute">
                <Text className='text-xl dark:text-light-300 text-dark-300 -rotate-90'>Player 4</Text>
              </View>
            </Pressable>
          </Animated.View>
          
        </View>
        <View className='flex-row items-center justify-center'>
          <Pressable onPress={openModal}>
              <ImageBackground source={images.highlight} className="px-4 py-2 bg-accent rounded-xl mx-1 overflow-hidden">
                <Image source={icons.settings} className='size-10'/>
              </ImageBackground>
          </Pressable>
        </View>

        <Modal
          animationType="slide" // or "fade", "none"
          transparent={true} // Make background transparent
          visible={modalVisible}
          onRequestClose={() => {
            closeModal(); // Handle back button press
          }}
        >
          <View className='flex-1 dark:bg-dark-300 bg-light-300 items-center justify-center opacity-90'>
            <Text className='text-xl dark:text-primary text-dark-100 mb-6 mt-6'>Player Count</Text>
            <View className='flex-row items-center justify-center mb-6'>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">2</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">3</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">4</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">5</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">6</Text>
            </View>
            <Text className='text-xl dark:text-primary text-dark-100 mb-6'>Commander damage</Text>
            <View className='flex-row items-center justify-center mb-6'>
              <Pressable onPress={() => setSelectedPlayer(0)}>
                <Text
                  className={`text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 rounded-xl mx-1 ${
                    selectedPlayer === 0
                      ? "bg-accent"
                      : "bg-light-200 dark:bg-dark-200"
                  }`}
                >
                  1
                </Text>
              </Pressable>
              <Pressable onPress={() => setSelectedPlayer(1)}>
                <Text
                  className={`text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 rounded-xl mx-1 ${
                    selectedPlayer === 1
                      ? "bg-accent"
                      : "bg-light-200 dark:bg-dark-200"
                  }`}
                >
                  2
                </Text>
              </Pressable>
              <Pressable onPress={() => setSelectedPlayer(2)}>
                <Text
                  className={`text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 rounded-xl mx-1 ${
                    selectedPlayer === 2
                      ? "bg-accent"
                      : "bg-light-200 dark:bg-dark-200"
                  }`}
                >
                  3
                </Text>
              </Pressable>
              <Pressable onPress={() => setSelectedPlayer(3)}>
                <Text
                  className={`text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 rounded-xl mx-1 ${
                    selectedPlayer === 3
                      ? "bg-accent"
                      : "bg-light-200 dark:bg-dark-200"
                  }`}
                >
                  4
                </Text>
              </Pressable>
            </View>
            <View className="flex-1 flex-wrap flex-row mb-6">
        
              <Animated.View style={{ opacity: opacity1 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPressIn={() => fade(opacity1, 0.5)} onPressOut={() => fade(opacity1, 1)} onPress={handleCommanderPress(0)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl dark:text-primary text-dark-100 rotate-90">+ {commanderDamage[selectedPlayer][0]} -</Text>
                </Pressable>
              </Animated.View>

              <Animated.View style={{ opacity: opacity2 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPressIn={() => fade(opacity2, 0.5)} onPressOut={() => fade(opacity2, 1)} onPress={handleCommanderPress(1)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl dark:text-primary text-dark-100 -rotate-90">- {commanderDamage[selectedPlayer][1]} +</Text>
                </Pressable>
              </Animated.View>

              <Animated.View style={{ opacity: opacity3 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPressIn={() => fade(opacity3, 0.5)} onPressOut={() => fade(opacity3, 1)} onPress={handleCommanderPress(2)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl dark:text-primary text-dark-100 rotate-90">+ {commanderDamage[selectedPlayer][2]} -</Text>
                </Pressable>
              </Animated.View>

              <Animated.View style={{ opacity: opacity4 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPressIn={() => fade(opacity4, 0.5)} onPressOut={() => fade(opacity4, 1)} onPress={handleCommanderPress(3)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl dark:text-primary text-dark-100 -rotate-90">- {commanderDamage[selectedPlayer][3]} +</Text>
                </Pressable>
              </Animated.View>
              
            </View>
            
            <Pressable>
              <ImageBackground source={images.highlight} className="px-4 py-4 bg-accent rounded-xl mx-1 mb-6 overflow-hidden">
                <Text className='text-xl text-primary' onPress={closeModal}>Close</Text>
              </ImageBackground>
            </Pressable>

          </View>

        </Modal>

      </ScrollView>
    </View>
    
  )
}

export default Health