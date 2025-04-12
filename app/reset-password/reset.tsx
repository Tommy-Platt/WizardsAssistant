import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResetPasswordScreen() {
  const { access_token } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (access_token) {
      // Supabase should already have the session if the access_token is valid
      // So we can now allow user to reset password
    }
  }, [access_token]);

  const handleReset = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password updated!');
      router.replace('/(auth)'); // go back to login/home screen
    }
  };

  return (

  // Main background view which can be scrolled.
  <View className="flex-1 dark:bg-dark-100 bg-primary">
    <ScrollView className="flex-1 px-5 py-20" 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>

      {/* Password reset boxes */}
      <View className="mb-6">
        <Text className="text-lg font-semibold dark:text-primary text-dark-100 mb-2">Reset Password</Text>

        <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-1">
        <TextInput 
            className="dark:text-primary text-dark-100" 
            placeholder="Enter your password" 
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
        ></TextInput>
        </View>
        <Pressable className="rounded-lg overflow-hidden my-6" onPress={() => handleReset()}>
            <LinearGradient
                colors={['#B416B1', '#AF52DE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="px-6 py-3 items-center justify-center"
            >
                <Text className="dark:text-primary text-dark-100 font-semibold text-lg">Reset</Text>
            </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  </View>
  );
}