import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FlirtCategory = 'standard' | 'playful' | 'spicy';

export interface FlirtResponse {
  flirtResponse: string;
  category: FlirtCategory;
  timestamp: number;
}

export interface SavedFlirt {
  id: string;
  image: string;
  flirts: FlirtResponse[];
}

export function useFlirtAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFlirt = async (
    image: string,
    category: FlirtCategory = 'standard'
  ): Promise<FlirtResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://rizz-server-one.vercel.app/api/flirt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          category,
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }

      if (!data || !data.flirtResponse) {
        throw new Error('Server response missing flirtResponse');
      }

      return {
        ...data,
        timestamp: Date.now()
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate flirt');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveFlirt = async (id: string, image: string, newFlirt: FlirtResponse) => {
    try {
      const savedFlirts = await getSavedFlirts();
      const existingFlirtIndex = savedFlirts.findIndex(flirt => flirt.id === id);

      if (existingFlirtIndex !== -1) {
        savedFlirts[existingFlirtIndex].flirts.unshift(newFlirt);
      } else {
        savedFlirts.unshift({
          id,
          image,
          flirts: [newFlirt]
        });
      }

      await AsyncStorage.setItem('savedFlirts', JSON.stringify(savedFlirts));
    } catch (err) {
      setError('Failed to save flirt');
    }
  };

  const getSavedFlirts = async (): Promise<SavedFlirt[]> => {
    try {
      const saved = await AsyncStorage.getItem('savedFlirts');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      setError('Failed to get saved flirts');
      return [];
    }
  };

  const deleteFlirt = async (id: string) => {
    try {
      const savedFlirts = await getSavedFlirts();
      const updatedFlirts = savedFlirts.filter(flirt => flirt.id !== id);
      await AsyncStorage.setItem('savedFlirts', JSON.stringify(updatedFlirts));
    } catch (err) {
      setError('Failed to delete flirt');
    }
  };

  return {
    generateFlirt,
    saveFlirt,
    getSavedFlirts,
    deleteFlirt,
    isLoading,
    error,
  };
} 