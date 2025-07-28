import { Text, View, Image, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from "react-native";
import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase'
import { useState } from 'react'
import { useRouter } from "expo-router";
import {  GoogleSignin,  GoogleSigninButton,  statusCodes,} from '@react-native-google-signin/google-signin'

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '785004448257-m2gudgbi736qlhh9ms010uc05c7gi3tr.apps.googleusercontent.com',
      iosClientId: '785004448257-1krp0hsltbs80nq1h6pcdtfdr8nadtvk.apps.googleusercontent.com',  })
  
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
            <View className="dark:bg-dark-300 bg-light-300 rounded-xl px-3 py-3">
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

            {/* Forgot Password Link. */}
            <Link className="text-accent" href="/forgot-password">
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