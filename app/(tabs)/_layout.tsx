import React from 'react'
import { View, useColorScheme } from 'react-native'
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { ImageBackground, Image } from 'react-native';
import { StyleSheet } from 'react-native';

// Styles for the tab bar based on light or dark mode
const styles = StyleSheet.create({
    tabBar: {
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 36,
        height: 60.5,
        position: 'absolute',
        overflow: 'hidden',
        borderWidth: 1,
        filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))',
    },
    tabBarDark: {
        backgroundColor: '#222222',
        borderColor: '#222222',
    },
    tabBarLight: {
        backgroundColor: '#e5e5e5',
        borderColor: '#e5e5e5',
    },
});

// Function to render the tab icon with options for focused state and color scheme
const TabIcon = ({ focused, icon, title, colorScheme }: any) => {
    if(focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-20 min-h-12 mt-6 justify-center items-center rounded-full overflow-hidden"
            > 
                <Image 
                    source={icon} 
                    tintColor={colorScheme === 'dark' ? "#F5F5F5" : "#2C2C2C"} 
                    className="size-8"
                />
            </ImageBackground>
        )
    }

    return (
        <View className="size-full justify-center items-center mt-6 rounded-full">
            <Image source={icon} tintColor={colorScheme === 'dark' ? "#F5F5F5" : "#2C2C2C"} className="size-10"/>
        </View>
    )
}    

// This is the layout of the tab icons (D&D, MTG, and Settings) and the tab bar styles. It uses the above functions to render the icons and styles based on the current theme (light or dark mode).
const _layout = () => {
    const colorScheme = useColorScheme(); // Get the current theme

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                },
                tabBarStyle: [
                    styles.tabBar,
                    colorScheme === 'dark' ? styles.tabBarDark : styles.tabBarLight,
                ],
            }}
        >
        <Tabs.Screen 
            name="dnd" 
            options={{ 
                title: 'D&D', 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                    focused={focused} 
                    icon={icons.dnd} 
                    title="D&D"
                    colorScheme={colorScheme}
                    />
                )  }}
        />
        <Tabs.Screen 
            name="mtg" 
            options={{ 
                title: 'MTG', 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                    focused={focused} 
                    icon={icons.mtg} 
                    title="MTG"
                    colorScheme={colorScheme}
                    />
                )  }}
        />
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: 'Settings', 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                    focused={focused} 
                    icon={icons.settings} 
                    title="Settings"
                    colorScheme={colorScheme}
                    />
                )  }}
        />
    </Tabs>
  )
}

export default _layout