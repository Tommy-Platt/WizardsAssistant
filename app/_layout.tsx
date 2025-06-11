import { Stack } from "expo-router";
import './global.css';
import { AuthProvider } from '../contexts/AuthProvider'

export default function RootLayout() {
  
  return (
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
        </Stack>
      </AuthProvider>
  );
}