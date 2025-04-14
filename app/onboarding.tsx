import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useRouter, Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  async function checkOnboardingStatus() {
    try {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      if (completed === 'true') {
        router.replace('/');
      }
    } catch (error) {
      console.log('Error checking onboarding status:', error);
    }
  }

  async function handleNotificationPermission() {
    try {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
      }
      completeOnboarding();
    } catch (error) {
      console.log('Error handling notifications:', error);
      completeOnboarding();
    }
  }

  async function completeOnboarding() {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      if (gender) {
        await AsyncStorage.setItem('userGender', gender);
      }
      router.replace('/');
    } catch (error) {
      console.log('Error completing onboarding:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {step === 1 ? (
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Welcome to RizzApp</Text>
            <Text style={styles.question}>What's your gender?</Text>
            <View style={styles.options}>
              <TouchableOpacity 
                style={[styles.option, gender === 'male' && styles.selectedOption]}
                onPress={() => setGender('male')}
              >
                <Text style={[styles.optionText, gender === 'male' && styles.selectedText]}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.option, gender === 'female' && styles.selectedOption]}
                onPress={() => setGender('female')}
              >
                <Text style={[styles.optionText, gender === 'female' && styles.selectedText]}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={() => setStep(2)}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.nextButton, gender && styles.nextButtonActive]}
              onPress={() => setStep(2)}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Enable Notifications</Text>
            <Text style={styles.description}>
              Get notified about new pickup lines and updates!
            </Text>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={completeOnboarding}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleNotificationPermission}
            >
              <Text style={styles.nextButtonText}>Enable</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  options: {
    gap: 16,
  },
  option: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  skipButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    flex: 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#333',
  },
  nextButtonActive: {
    backgroundColor: '#000',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 