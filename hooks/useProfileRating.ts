import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileRatingResponse {
  headerText: string;
  profileRating: number;
  tip1: string;
  tip2: string;
  tip3: string;
}

export interface ProfileRatingRequest {
  images: string[];
  aboutMe: string;
}

export interface SavedProfileRating {
  images: string[];
  aboutMe: string;
  result: ProfileRatingResponse;
}

const DEFAULT_RESPONSE: ProfileRatingResponse = {
  headerText: 'Profile needs significant improvements to stand out on Tinder',
  profileRating: 50,
  tip1: 'Add more high-quality, clear photos of yourself',
  tip2: 'Write a more engaging bio that shows your personality',
  tip3: 'Include specific interests and hobbies to create conversation starters'
};

export function useProfileRating() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [savedRating, setSavedRating] = useState<SavedProfileRating | null>(null);

  useEffect(() => {
    loadSavedRating();
  }, []);

  const loadSavedRating = async () => {
    try {
      const saved = await AsyncStorage.getItem('profileRating');
      if (saved) {
        const parsed = JSON.parse(saved) as SavedProfileRating;
        setSavedRating(parsed);
        setSelectedImages(parsed.images);
      }
    } catch (err) {
      console.error('Failed to load saved rating:', err);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Sorry, we need camera roll permissions to make this work!');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        if (selectedImages.length >= 4) {
          setError('Maximum 4 images allowed');
          return null;
        }
        const base64Image = result.assets[0].base64;
        if (base64Image) {
          setSelectedImages(prev => [...prev, base64Image]);
          return base64Image;
        }
      }
      return null;
    } catch (err) {
      setError('Failed to pick image');
      return null;
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getRating = async (aboutMe: string): Promise<ProfileRatingResponse> => {
    if (selectedImages.length === 0) {
      setError('Please select at least one image');
      return DEFAULT_RESPONSE;
    }

    if (!aboutMe) {
      setError('Please provide some information about yourself');
      return DEFAULT_RESPONSE;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://rizz-server-one.vercel.app/api/profileAnalyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: selectedImages,
          aboutMe,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get profile rating');
      }

      const data = await response.json();
      
 
      const saveData: SavedProfileRating = {
        images: selectedImages,
        aboutMe,
        result: data
      };
      await AsyncStorage.setItem('profileRating', JSON.stringify(saveData));
      setSavedRating(saveData);
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get profile rating');
      return DEFAULT_RESPONSE;
    } finally {
      setIsLoading(false);
    }
  };

  const resetRating = async () => {
    await AsyncStorage.removeItem('profileRating');
    setSavedRating(null);
    setSelectedImages([]);
    setError(null);
  };

  return {
    pickImage,
    removeImage,
    getRating,
    resetRating,
    selectedImages,
    savedRating,
    isLoading,
    error,
  };
} 