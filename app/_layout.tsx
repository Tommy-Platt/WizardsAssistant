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
        name="(auth)/index"
        options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="(auth)/sign-up"
        options={{ headerShown: false }} 
        />
        </Stack>
      </AuthProvider>
  );
}