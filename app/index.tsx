import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryImage, HISTORY_IMAGES } from '../components/HistoryImage';
import { BottomButtons } from '../components/BottomButtons';
import { Navbar } from '../components/Navbar';

export default function HomePage() {
  const router = useRouter();

  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem('onboardingCompleted');
    await AsyncStorage.removeItem('userGender');
    router.replace('/onboarding');
  };

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.wrapper}
    >
      <Navbar />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
          
          <View style={styles.historyContainer}>
            {HISTORY_IMAGES.map((image) => (
              <HistoryImage key={image.id} id={image.id} url={image.image} />
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity 
            onPress={handleResetOnboarding}
            style={styles.resetButton}
          >
            <Text style={styles.resetButtonText}>Reset Onboarding</Text>
          </TouchableOpacity>
        <BottomButtons />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  historyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -4,
    marginTop: 8,
  },
  resetButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  resetButtonText: {
    color: '#666',
    fontSize: 12,
  },
}); 