import { Stack } from "expo-router";
import './global.css';
import { FeatureProvider } from '@/contexts/FeatureContext';
import { StatusBar } from 'react-native';
import { Buffer } from 'buffer';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthProvider';

global.Buffer = global.Buffer || Buffer;

export function DeepLinkHandler() {
  const { loginWithToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async (url: string | null) => {
      if (!url) return;

      // Parses the reset password URL to get the access and refresh tokens. Supabase uses # for fragments so the URL gets split on that.
      const parsed = Linking.parse(url);
      const queryParams = parsed.queryParams ?? {};
      const fragment = url.split('#')[1];
      const fragmentParams = new URLSearchParams(fragment || '');

      const type = queryParams['type'];
      const access_token = fragmentParams.get('access_token');
      const refresh_token = fragmentParams.get('refresh_token');

      if (type === 'recovery') {
        // If the type is recovery it means the user is resetting their password
        if (access_token) {
          router.replace(`/reset-password/reset?access_token=${encodeURIComponent(access_token)}`);
        }
        return;
      }

      // Normal login flow
      if (access_token && refresh_token) {
        try {
          await loginWithToken({ access_token, refresh_token });
          router.replace('/(tabs)');
        } catch (e) {
          console.error('Failed to log in with tokens', e);
        }
      }
    };

    Linking.getInitialURL().then((url) => handleDeepLink(url));
    const sub = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => sub.remove();
  }, []);

  return null;
}

export default function RootLayout() {

  return (
    <FeatureProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <AuthProvider>
        <DeepLinkHandler />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(dnd)/spells" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="(mtg)/cards" options={{ headerShown: false }} />
          <Stack.Screen name="(mtg)/cards/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="(dnd)/spells/[index]" options={{ headerShown: false }} />
          <Stack.Screen name="(dnd)/items" options={{ headerShown: false }} />
          <Stack.Screen name="(dnd)/items/[slug]" options={{ headerShown: false }} />
          <Stack.Screen name="(mtg)/health" options={{ headerShown: false }} />
          <Stack.Screen name="(dnd)/dice" options={{ headerShown: false }} />
          <Stack.Screen name="(dnd)/session" options={{ headerShown: false }} />
          <Stack.Screen name="reset-password/reset" options={{ headerShown: false }}/>
          <Stack.Screen name="(auth)/forgot-password" options={{ headerShown: false }}/>
        </Stack>
      </AuthProvider>
    </FeatureProvider>
  );
}
