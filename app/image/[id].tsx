import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Clipboard, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Navbar } from '../../components/Navbar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFlirtAI, FlirtCategory, SavedFlirt, FlirtResponse } from '../../hooks/useFlirtAI';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  FadeIn,
  FadeOut,
  FadeInUp,
  useSharedValue
} from 'react-native-reanimated';

const LoadingSkeleton = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Animated.View style={[styles.skeletonContent, animatedStyle]}>
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, { width: '60%' }]} />
        </Animated.View>
        <View style={styles.skeletonIcon} />
      </View>
    </View>
  );
};

export default function ImageDetail() {
  const { id, image, isNew } = useLocalSearchParams();
  const router = useRouter();
  const { generateFlirt, saveFlirt, getSavedFlirts, isLoading, error } = useFlirtAI();
  const [selectedCategory, setSelectedCategory] = useState<FlirtCategory>('standard');
  const [savedFlirtData, setSavedFlirtData] = useState<SavedFlirt | null>(null);

  const categories: { id: FlirtCategory; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'standard', label: 'Standard', icon: 'heart-outline' },
    { id: 'playful', label: 'Playful', icon: 'happy-outline' },
    { id: 'spicy', label: 'Spicy', icon: 'flame-outline' },
  ];

  useEffect(() => {
    const initializeImage = async () => {
      if (isNew === 'true') {
        if (image) {
          const decodedImage = decodeURIComponent(image as string);
          handleGenerateFlirt(decodedImage);
        }
      } else {
        await loadSavedFlirtData();
      }
    };

    initializeImage();
  }, [image, isNew]);

  const loadSavedFlirtData = async () => {
    try {
      const savedFlirts = await getSavedFlirts();
      const flirtData = savedFlirts.find(flirt => flirt.id === id);
      if (flirtData) {
        setSavedFlirtData(flirtData);
        if (flirtData.flirts.length > 0) {
          setSelectedCategory(flirtData.flirts[0].category);
        }
      }
    } catch (err) {
    }
  };

  const handleGenerateFlirt = async (initialImage?: string) => {
    const imageToUse = initialImage || savedFlirtData?.image || (image ? decodeURIComponent(image as string) : null);
    if (!imageToUse) return;
    
    const response = await generateFlirt(imageToUse, selectedCategory);
    if (response) {
      await saveFlirt(id as string, imageToUse, response);
      await loadSavedFlirtData();
    }
  };

  const handleCopy = async (flirt: FlirtResponse) => {
    await Clipboard.setString(flirt.flirtResponse);
  };

  const getImageSource = () => {
    if (savedFlirtData) {
      return { uri: `data:image/jpeg;base64,${savedFlirtData.image}` };
    } else if (image) {
      return { uri: `data:image/jpeg;base64,${decodeURIComponent(image as string)}` };
    }
    return null;
  };

  const imageSource = getImageSource();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Navbar />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category.id 
                    ? CATEGORY_COLORS[category.id].active 
                    : CATEGORY_COLORS[category.id].inactive
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.id ? '#fff' : CATEGORY_COLORS[category.id].active} 
              />
              <Text style={[
                styles.categoryText,
                { 
                  color: selectedCategory === category.id 
                    ? '#fff' 
                    : CATEGORY_COLORS[category.id].active
                }
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {imageSource && (
          <Image 
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.sectionHeader} />

        {isLoading && (
          <Animated.View entering={FadeIn} style={styles.card}>
            <View style={[styles.cardContent, styles.loadingContent]}>
              <Ionicons name="heart" size={24} color={CATEGORY_COLORS[selectedCategory].active} />
              <Text style={[styles.flirtText, styles.loadingText]}>
                Crafting the perfect rizz...
              </Text>
            </View>
          </Animated.View>
        )}

        {error && (
          <Animated.View entering={FadeIn} style={styles.card}>
            <View style={styles.errorCard}>
              <Ionicons name="alert-circle-outline" size={24} color="#E53935" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </Animated.View>
        )}

        {savedFlirtData?.flirts.map((flirt, index) => 
          flirt.flirtResponse && (
            <Animated.View 
              key={flirt.timestamp} 
              entering={FadeInUp.duration(300).delay(index * 100)}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <Text style={styles.flirtText}>{flirt.flirtResponse}</Text>
                <TouchableOpacity 
                  onPress={() => handleCopy(flirt)} 
                  style={styles.copyButton}
                >
                  <Ionicons name="copy-outline" size={20} color={CATEGORY_COLORS[flirt.category].active} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.generateButton]}
          onPress={() => handleGenerateFlirt()}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#FF4D43', '#FF2D55']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonInner}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Generating...' : `Get ${selectedCategory} Line 🔥`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const CATEGORY_COLORS = {
  standard: {
    active: '#4A90E2',
    inactive: '#EDF5FF'
  },
  playful: {
    active: '#9C27B0',
    inactive: '#F8E7FB'
  },
  spicy: {
    active: '#E53935',
    inactive: '#FFEBEE'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 12,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  flirtText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginRight: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#E53935',
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  copyButton: {
    padding: 4,
  },
  copiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  copiedText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  generateButton: {
    borderRadius: 24,

    marginBottom: 20,
    overflow: 'hidden',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  gradientText: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  skeletonContent: {
    width: '100%',
  },
  skeletonLine: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  loadingText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#666',
  },
}); 