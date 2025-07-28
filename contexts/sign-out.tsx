import { Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { icons } from '../constants/icons';

// Reusable sign-out button component
export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.replace("/(auth)");
    }
  };

  return (
    <Pressable onPress={handleSignOut}>
      <Image source={icons.account} className="size-8" />
    </Pressable>
  );
}