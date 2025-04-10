import { Text, View, Image, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase'
import { useState } from 'react'
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
    // Function calls Supabase sign-in to check credentials
    async function signInWithEmail() {
      setLoading(true)
      const { error, data: {session} } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      
      // Supabase handles errors, displayed as device alerts
      if (error) Alert.alert(error.message)
      setLoading(false)

      // If a successful session is created, redirect to settings page
      if (session) {
        router.push('/(tabs)')
      }
    }
  
  return (
    
    // Main background view which can be scrolled.
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        
        {/* Logo and title in a pill container w/ icon */}
        <Image 
        source={icons.logoTrans} 
        className="w-32 h-32 mt-1 mb-1 mx-auto"
        > 
        </Image>

        {/* Box that encapsulates auth inputs and buttons. */}
        <View className="mt-10 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200">

          {/* Email Input Box */}
          <View className="mb-6">
            <Text className="text-lg font-semibold dark:text-primary text-dark-100 mb-2">Email</Text>
            <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-1">
            <TextInput 
                className="dark:text-primary text-dark-100" 
                placeholder="Enter your email" 
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)} // Email set for use in signInWithEmail
                value={email}
              ></TextInput>
            </View>
          </View>

          {/* Password Input Box */}
          <View className="mb-6">
            <Text className="text-lg font-semibold dark:text-primary text-dark-100 mb-2">Password</Text>
            <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-1">
              <TextInput 
                className="dark:text-primary text-dark-100" 
                placeholder="Enter your password" 
                secureTextEntry // Hides password characters
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setPassword(text)} // Password set for use in signInWithEmail
                value={password}
              ></TextInput>
            </View>
          </View>

          {/* Sign In Button. Clicking on it calls the sign-in function. */}
          <Pressable className="rounded-lg overflow-hidden" disabled={loading} onPress={() => signInWithEmail()}>
            <LinearGradient
              colors={['#B416B1', '#AF52DE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="px-6 py-3 items-center justify-center"
            >
              <Text className="dark:text-primary text-dark-100 font-semibold text-lg">Sign In</Text>
            </LinearGradient>
          </Pressable>

          <View className="flex-row items-center justify-between mt-6 mb-2">

            {/* Forgot Password Link. CURRENTLY NOT WORKING! */}
            <Link className="text-accent" href="/(tabs)/dnd">
              Forgot password?
            </Link>

            {/* Sign Up Link */}
            <Link className="text-accent" href={"/sign-up"}>
              Sign Up
            </Link>
          </View>

        </View>

        <View className="justify-center items-center mt-6 mb-6">
          <Text className="dark:text-primary text-dark-100 text-lg">Or</Text>
        </View>

        {/* OAuth Sign-in here. */}

      </ScrollView>
    </View>
  );
}