import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { HistoryImage } from '../components/HistoryImage';
import { BottomButtons } from '../components/BottomButtons';
import { Navbar } from '../components/Navbar';
import { useCallback, useEffect, useState } from 'react';
import { SavedFlirt, useFlirtAI } from '../hooks/useFlirtAI';

export default function HomePage() {
  const router = useRouter();
  const { saveFlirt, deleteFlirt } = useFlirtAI();
  const [savedFlirts, setSavedFlirts] = useState<SavedFlirt[]>([]);

  const loadSavedFlirts = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedFlirts');
      if (saved) {
        const parsedFlirts = JSON.parse(saved);
        setSavedFlirts(parsedFlirts);
      }
    } catch (err) {
      console.error('Failed to load saved flirts:', err);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteFlirt(id);
    await loadSavedFlirts();
  };

  // Load flirts when the component mounts
  useEffect(() => {
    loadSavedFlirts();
  }, []);

  // Reload flirts when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedFlirts();
    }, [])
  );

  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // Launch image picker with minimal processing
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled) {
        const newId = Date.now().toString();
        // Navigate immediately, even before base64 is ready
        router.push(`/image/${newId}?isNew=true`);
        
        // Process image after navigation has started
        if (result.assets[0].base64) {
          router.setParams({ image: encodeURIComponent(result.assets[0].base64) });
        }
      }
    } catch (err) {
      alert('Failed to pick image. Please try again.');
    }
  };

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
            {savedFlirts.map((flirt) => (
              <HistoryImage 
                key={flirt.id} 
                id={flirt.id} 
                url={flirt.image} 
                onDelete={handleDelete}
              />
            ))}
          </View>
        </ScrollView>
        <BottomButtons onUpload={handleImageUpload} />
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
}); 