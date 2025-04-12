import { Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase'; // adjust path if needed
import { icons } from '../constants/icons'; // or wherever your icons are from

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
      <Image source={icons.account} className="size-8 -ml-8" />
    </Pressable>
  );
}