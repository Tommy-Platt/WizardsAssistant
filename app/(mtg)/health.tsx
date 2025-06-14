import { View, Text, ScrollView, Pressable, Modal, Image, Animated } from 'react-native'
import { icons } from "@/constants/icons";
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

  return (
    <View className="flex-1 dark:bg-dark-100 bg-primary items-center justify-center">
      <ScrollView className="flex-1 px-5" 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        <View className="flex-1 flex-wrap flex-row mt-6">
          
          <Animated.View style={{ opacity: opacity1 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity1, 0.5)} onPressOut={() => fade(opacity1, 1)} onPress={handlePress(0)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl text-primary rotate-90">+ {health[0]} -</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ opacity: opacity2 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity2, 0.5)} onPressOut={() => fade(opacity2, 1)} onPress={handlePress(1)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl text-primary -rotate-90">- {health[1]} +</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ opacity: opacity3 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity3, 0.5)} onPressOut={() => fade(opacity3, 1)} onPress={handlePress(2)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl text-primary rotate-90">+ {health[2]} -</Text>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ opacity: opacity4 }} className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
            <Pressable onPressIn={() => fade(opacity4, 0.5)} onPressOut={() => fade(opacity4, 1)} onPress={handlePress(3)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
              <Text className="text-6xl text-primary -rotate-90">- {health[3]} +</Text>
            </Pressable>
          </Animated.View>
          
        </View>
        <View className='flex-row items-center justify-center'>
          <Pressable onPress={openModal}>
            <View className="px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">
              <Image source={icons.settings} className='size-10 color-accent'/>
            </View>
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
          <View className='flex-1 dark:bg-dark-300 bg-primary items-center justify-center opacity-90'>
            <Text className='text-xl text-primary mb-6 mt-6'>Player Count</Text>
            <View className='flex-row items-center justify-center mb-6'>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">2</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">3</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">4</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">5</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">6</Text>
            </View>
            <Text className='text-xl text-primary mb-6'>Commander damage</Text>
            <View className='flex-row items-center justify-center mb-6'>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">1</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">2</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">3</Text>
              <Text className="text-2xl dark:text-primary text-dark-100 font-bold px-4 py-2 bg-light-200 dark:bg-dark-200 rounded-xl mx-1">4</Text>
            </View>
            <View className="flex-1 flex-wrap flex-row mb-6">
        
              <View className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPress={handlePress(0)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl text-primary rotate-90">+ {health[0]} -</Text>
                </Pressable>
              </View>

              <View className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPress={handlePress(1)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl text-primary -rotate-90">- {health[1]} +</Text>
                </Pressable>
              </View>

              <View className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPress={handlePress(2)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl text-primary rotate-90">+ {health[2]} -</Text>
                </Pressable>
              </View>

              <View className="w-1/2 h-1/2 p-2" onLayout={handleLayout}>
                <Pressable onPress={handlePress(3)} className='flex-1 items-center justify-center bg-light-200 dark:bg-dark-200 rounded-xl w-full'>
                  <Text className="text-6xl text-primary -rotate-90">- {health[3]} +</Text>
                </Pressable>
              </View>
              
            </View>
            
            <Pressable>
              <View className='bg-accent p-3 rounded-xl mb-6'>
                <Text className='text-xl dark:text-primary text-dark-100' onPress={closeModal}>Close</Text>
              </View>
            </Pressable>

          </View>

        </Modal>

      </ScrollView>
    </View>
    
  )
}

export default Health