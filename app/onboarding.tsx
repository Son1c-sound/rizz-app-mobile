import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSuperwall } from '../hooks/useSuperWall';
import { SUPERWALL_TRIGGERS } from './config/superwall';

export default function OnboardingPage() {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const router = useRouter();
  const { isSubscribed, showPaywall } = useSuperwall();

  useEffect(() => {
    checkOnboardingStatus();
  }, [isSubscribed]);

  async function checkOnboardingStatus() {
    try {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      if (completed === 'true') {
        if (isSubscribed) {
          router.replace('/');
        } else {
          await showPaywall(SUPERWALL_TRIGGERS.FEATURE_UNLOCK);
          await AsyncStorage.removeItem('onboardingCompleted');
        }
      }
    } catch (error) {
      console.log('Error checking onboarding status:', error);
    }
  }

  async function completeOnboarding() {
    try {
      if (gender) {
        await AsyncStorage.setItem('userGender', gender);
      }
      
      await showPaywall(SUPERWALL_TRIGGERS.FEATURE_UNLOCK);
      
      if (!isSubscribed) {
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        router.replace('/');
      }
    } catch (error) {
      console.log('Error completing onboarding:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Welcome to RizzUP</Text>
          <Text style={styles.question}>What's your gender?</Text>
          <View style={styles.options}>
            <TouchableOpacity 
              onPress={() => setGender('male')}
            >
              <LinearGradient
                colors={['#FF4D43', '#FF2D55']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.optionBorder, gender === 'male' && styles.selectedOptionBorder]}
              >
                <View style={[styles.option, gender === 'male' && styles.selectedOption]}>
                  <Text style={[styles.optionText, gender === 'male' && styles.selectedText]}>
                    Male
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setGender('female')}
            >
              <LinearGradient
                colors={['#FF4D43', '#FF2D55']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.optionBorder, gender === 'female' && styles.selectedOptionBorder]}
              >
                <View style={[styles.option, gender === 'female' && styles.selectedOption]}>
                  <Text style={[styles.optionText, gender === 'female' && styles.selectedText]}>
                    Female
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.nextButton, gender && styles.nextButtonActive]}
            onPress={completeOnboarding}
          >
            <LinearGradient
              colors={['#FF4D43', '#FF2D55']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonInner}
            >
              <Text style={styles.nextButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={completeOnboarding}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 32,
    textAlign: 'center',
  },
  options: {
    width: '100%',
    gap: 16,
  },
  optionBorder: {
    borderRadius: 16,
    padding: 1, // This creates the border effect
  },
  selectedOptionBorder: {
    opacity: 1,
  },
  option: {
    padding: 20,
    borderRadius: 15, // Slightly smaller to fit inside gradient border
    backgroundColor: '#000',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'transparent',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  buttons: {
    gap: 12,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    opacity: 0.5,
  },
  nextButtonActive: {
    opacity: 1,
  },
  buttonInner: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
