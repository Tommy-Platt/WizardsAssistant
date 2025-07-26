import { useState } from 'react';
import { View, TextInput, Pressable, Alert, Text, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleSendResetEmail = async () => {
    // Redirects to hidden reset page upon email verification
    const redirectUrl = Linking.createURL('reset-password/reset');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Email Sent', 'Check your email for a reset link!');
    }
  };

  return (
    // Main background view which can be scrolled.
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>

        <View className="mt-20 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200">

          {/* Email Input Box */}
          <View className="mb-6">
            <Text className="text-lg font-semibold dark:text-primary text-dark-100 mb-2">Email</Text>
            <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-3">
            <TextInput 
                className="dark:text-primary text-dark-100" 
                placeholder="Enter your email."  
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)} // Email set for verification
                value={email}
              ></TextInput>
            </View>
          </View>

          {/* Verify button. When pressed it sends the email to the user. */}
          <Pressable className="rounded-lg overflow-hidden" onPress={() =>handleSendResetEmail()}>
            <LinearGradient
              colors={['#B416B1', '#AF52DE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="px-6 py-3 items-center justify-center"
            >
              <Text className="dark:text-primary text-dark-100 font-semibold text-lg">Verify Email</Text>
            </LinearGradient>
          </Pressable>
        </View>
        <View className="mt-6 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200">
          <Text className="dark:text-primary text-dark-100 text-pretty">If you successfully verify your email, you will be signed in using a One Time Password.{"\n"}{"\n"}Please visit the settings menu to change your password upon sign-in.</Text>
        </View>
      </ScrollView>
    </View>
  );
}