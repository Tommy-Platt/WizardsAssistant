import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  
  return (
    <Stack >
        <Stack.Screen 
          name="(tabs)"
          options={ { headerShown: false } }
        />
        <Stack.Screen 
          name="cards/[id]"
          options={ { headerShown: false } }
        />
      </Stack>
  );
}