import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';
import { useSuperwall } from '../hooks/useSuperWall';
import { superwallService } from './services/superwall';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { isSubscribed } = useSuperwall();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (loaded) {
          const completed = await AsyncStorage.getItem('onboardingCompleted');
          await SplashScreen.hideAsync();
          
          if (completed !== 'true') {
            router.replace('/onboarding');
          } else if (!isSubscribed) {
            // If onboarding is completed but not subscribed, reset and go back to onboarding
            await AsyncStorage.removeItem('onboardingCompleted');
            router.replace('/onboarding');
          }
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [loaded, isSubscribed]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      superwallService.initialize();
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: 'transparent' }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack 
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 150,
            contentStyle: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack.Screen 
            name="index" 
            options={{
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
          />
          <Stack.Screen 
            name="image/[id]" 
            options={{
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
          />
          <Stack.Screen name="profile" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="pickup-lines" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
