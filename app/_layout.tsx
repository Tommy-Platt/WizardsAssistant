import { Stack } from "expo-router";
import './global.css';
import { AuthProvider } from '../contexts/AuthProvider'
import { FeatureProvider } from '@/contexts/FeatureContext';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  
  return (
  <FeatureProvider>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <AuthProvider>
      <Stack >
        <Stack.Screen 
          name="(tabs)"
          options={ { headerShown: false } }
        />
        <Stack.Screen 
          name="(dnd)/spells"
          options={ { headerShown: false } }
        />
        <Stack.Screen
        name="(auth)/index"
        options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="(auth)/sign-up"
        options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="(mtg)/cards"
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="(mtg)/cards/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(dnd)/spells/[index]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(dnd)/items"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(dnd)/items/[slug]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(mtg)/health"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(dnd)/dice"
          options={{ headerShown: false }}
        />
        </Stack>
      </AuthProvider>
    </FeatureProvider>
  );
}