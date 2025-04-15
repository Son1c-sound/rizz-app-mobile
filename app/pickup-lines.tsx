import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import { Navbar } from '../components/Navbar';
import { pickupLines } from '../data/pickupLines';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = 'standard' | 'spicy' | 'playful';

const CATEGORY_COLORS = {
  standard: {
    active: '#4A90E2',
    text: '#fff',
    border: '#4A90E2',
    inactive: '#EDF5FF'
  },
  playful: {
    active: '#9C27B0',
    text: '#fff',
    border: '#9C27B0',
    inactive: '#F8E7FB'
  },
  spicy: {
    active: '#E53935',
    text: '#fff',
    border: '#E53935',
    inactive: '#FFEBEE'
  }
};

export default function PickupLinesPage() {
  const [currentLine, setCurrentLine] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('standard');

  const categories: { id: Category; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'standard', label: 'Standard', icon: 'heart-outline' },
    { id: 'playful', label: 'Playful', icon: 'happy-outline' },
    { id: 'spicy', label: 'Spicy', icon: 'flame-outline' },
  ];

  const getRandomPickupLine = () => {
    const filteredLines = pickupLines.filter(line => line.category === selectedCategory);
    const randomIndex = Math.floor(Math.random() * filteredLines.length);
    setCurrentLine(filteredLines[randomIndex].text);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (currentLine) {
      await Clipboard.setString(currentLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Navbar />
      <View style={styles.content}>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: selectedCategory === category.id 
                    ? CATEGORY_COLORS[category.id].active 
                    : CATEGORY_COLORS[category.id].inactive,
                  borderColor: CATEGORY_COLORS[category.id].border,
                }
              ]}
              onPress={() => {
                setSelectedCategory(category.id);
                setCurrentLine(null);
              }}
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

        <View style={styles.card}>
          {currentLine ? (
            <>
              <View style={styles.cardContent}>
                <Text style={styles.pickupLineText}>{currentLine}</Text>
                <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                  {copied ? (
                    <View style={styles.copiedContainer}>
                      <Ionicons name="checkmark" size={18} color={CATEGORY_COLORS[selectedCategory].active} />
                      <Text style={[styles.copiedText, {
                        color: CATEGORY_COLORS[selectedCategory].active
                      }]}>Copied!</Text>
                    </View>
                  ) : (
                    <Ionicons name="copy-outline" size={20} color={CATEGORY_COLORS[selectedCategory].active} />
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={styles.placeholderText}>
              Tap the button below to get a {selectedCategory.toLowerCase()} pickup line!
            </Text>
          )}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.generateButton, {
            backgroundColor: CATEGORY_COLORS[selectedCategory].active
          }]}
          onPress={getRandomPickupLine}
        >
          <View style={styles.buttonInner}>
            <Ionicons name="refresh" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Generate {selectedCategory} Line</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
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
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  pickupLineText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  generateButton: {
    borderRadius: 24,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 