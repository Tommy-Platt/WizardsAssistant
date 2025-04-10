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
        name="index"
        options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="sign-up"
        options={{ headerShown: false }} 
        />
        </Stack>
      </AuthProvider>
  );
}