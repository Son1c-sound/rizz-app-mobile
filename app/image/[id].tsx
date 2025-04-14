import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Clipboard } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { HISTORY_IMAGES } from '../../components/HistoryImage';
import { Button } from '../../components/Button';
import { Navbar } from '../../components/Navbar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ImageDetail() {
  const { id } = useLocalSearchParams();
  const image:any = HISTORY_IMAGES.find(img => img.id === Number(id));
  const scrollViewRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('standard');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'standard', label: 'Standard' },
    { id: 'playful', label: 'Playful' },
    { id: 'spicy', label: 'Spicy' }
  ];

  const pickupLines = [
    "Are you French? Because Eiffel for you!",
    "Are you a magician? Because whenever I look at you, everyone else disappears!",
    "Do you have a map? I keep getting lost in your eyes!",
      "Do you have a map? I keep getting lost in your eyes!",
        "Do you have a map? I keep getting lost in your eyes!",
    
  ];

  const getButtonText = () => {
    switch(selectedCategory) {
      case 'standard':
        return 'Get Standard Rizz';
      case 'playful':
        return 'Get Playful Rizz';
      case 'spicy':
        return 'Get Spicy Rizz';
      default:
        return 'Get More';
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await Clipboard.setString(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <View style={styles.mainContainer}>
      <Navbar />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={['#f8f9fa', '#e9ecef']}
          style={styles.wrapper}
        >
          <View style={styles.container}>
            <Image
              source={{ uri: image.image }}
              style={styles.image}
              resizeMode="cover"
            />
            
            <View style={styles.cardsContainer}>
              {pickupLines.map((line, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.pickupLineText}>{line}</Text>
                  
                  <TouchableOpacity 
                    style={styles.copyButton}
                    onPress={() => handleCopy(line, index)}
                  >
                    {copiedIndex === index ? (
                      <View style={styles.copiedContainer}>
                        <Ionicons name="checkmark" size={20} color="#4CAF50" />
                        <Text style={styles.copiedText}>Copied!</Text>
                      </View>
                    ) : (
                      <Ionicons name="copy-outline" size={20} color="#666" />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)', '#ffffff']}
        style={styles.bottomContainer}
      >
        <View style={styles.categoryBadges}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryBadge,
                selectedCategory === category.id && styles.categoryBadgeSelected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryBadgeText,
                selectedCategory === category.id && styles.categoryBadgeTextSelected
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button variant="black" style={styles.generateButton}>
          {getButtonText()}
        </Button>
      </LinearGradient>
    </View>
  );
}

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.6;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, 
  
  },
  wrapper: {
    flex: 1,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 24,
  },
  cardsContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pickupLineText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
    textAlign: 'left',
  },
  copyButton: {
    padding: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  copiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  copiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 32, // Increased top padding for gradient effect
    gap: 12,
  },
  categoryBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.8)', // Semi-transparent background
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryBadgeSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  categoryBadgeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryBadgeTextSelected: {
    color: '#fff',
  },
  generateButton: {
    width: '100%',
  },
}); 