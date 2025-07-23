import { Text, View, Image, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import { useRouter } from "expo-router";
import {  GoogleSignin,  GoogleSigninButton,  statusCodes,} from '@react-native-google-signin/google-signin'

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

  // Function calls Supabase sign-up
  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    // If a successful session is created, redirect to sign-in page
    if (session) router.push('/')

    // Supabase handles errors, displayed as device alerts
    if (error) Alert.alert(error.message)

    // If session is not created, alert user to verify their account before sign in
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }
  
  return (
    
    // Main background view which can be scrolled.
    <View className="flex-1 dark:bg-dark-100 bg-primary">

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ):

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
            <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-3">
            <TextInput 
                className="dark:text-primary text-dark-100" 
                placeholder="Enter your email."  
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)} // Email set for use in signUpWithEmail
                value={email}
              ></TextInput>
            </View>
          </View>

          {/* Password Input Box */}
          <View className="mb-6">
            <Text className="text-lg font-semibold dark:text-primary text-dark-100 mb-2">Password</Text>
            <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-3">
              <TextInput 
                className="dark:text-primary text-dark-100" 
                placeholder="Enter your password." 
                secureTextEntry // Hides password characters
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setPassword(text)} // Password set for use in signUpWithEmail
                value={password}
              ></TextInput>
            </View>
          </View>

          {/* Sign Up Button. Clicking on it calls the sign-up function. */}
          <Pressable className="rounded-lg overflow-hidden" disabled={loading} onPress={() =>signUpWithEmail()}>
            <LinearGradient
              colors={['#B416B1', '#AF52DE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="px-6 py-3 items-center justify-center"
            >
              <Text className="dark:text-primary text-dark-100 font-semibold text-lg">Sign Up</Text>
            </LinearGradient>
          </Pressable>

          <View className="flex-row items-center justify-between mt-6 mb-2">

            {/* Forgot Password Link */}
            <Link className="text-accent" href="/forgot-password">
              Forgot password?
            </Link>

            {/* Sign In Link */}
            <Link className="text-accent" href="/">
              Sign In
            </Link>
          </View>

        </View>

        <View className="justify-center items-center mt-6 mb-6">
          <Text className="dark:text-primary text-dark-100 text-lg">Or</Text>
        </View>
        
        {/* Google sign-in button provided by package. onPress logic provided by Supabase. */}
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices()
              const userInfo = await GoogleSignin.signIn()
              if (userInfo.data && userInfo.data.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                  provider: 'google',
                  token: userInfo.data.idToken,
                })
                console.log(error, data)
              } else {
                throw new Error('no ID token present!')
              }
            } catch (error: any) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
            }
          }}
        />
      </ScrollView>
      }
    </View>
  );
}