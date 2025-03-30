import { colorScheme, useColorScheme } from "nativewind";

// Use imperatively
colorScheme.set("dark");

export default function App() {
  // Or as a hook
  const { setColorScheme } = useColorScheme();
  setColorScheme("dark");
}