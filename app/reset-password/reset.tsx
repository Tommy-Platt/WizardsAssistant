import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleReset = async () => {

    // Ensures passwords match before resetting
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    } else {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Password updated!');
        // Clear session to prevent auto-login after reset:
        await supabase.auth.signOut();

        // Send user to sign-in page
        router.replace('/(auth)');
      }};
    }

  return (
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView
        className="flex-1 px-5 py-20"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <View className="mb-6">
          <Text className="text-lg font-semibold dark:text-primary text-dark-100 mb-2">
            Reset Password
          </Text>

          <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-3">
            <TextInput
              className="dark:text-primary text-dark-100"
              placeholder="Enter your new password"
              placeholderTextColor={'#A0A0A0'}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
          
          <Text className="text-lg font-semibold dark:text-primary text-dark-100 mt-2 mb-2">
            Confirm Password
          </Text>

          <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-3">
            <TextInput
              className="dark:text-primary text-dark-100"
              placeholder="Confirm your new password"
              placeholderTextColor={'#A0A0A0'}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <Pressable className="rounded-lg overflow-hidden my-6" onPress={handleReset}>
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