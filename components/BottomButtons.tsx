import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

interface BottomButtonsProps {
  onUpload: () => void;
}

export function BottomButtons({ onUpload }: BottomButtonsProps) {
  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <View style={styles.uploadButtonInner}>
          <Text style={styles.uploadButtonText}>Upload a Screenshot</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <Link href="/rate-profile" asChild>
          <TouchableOpacity style={styles.whiteButton}>
            <View style={styles.whiteButtonInner}>
              <Text style={styles.whiteButtonText} numberOfLines={1} adjustsFontSizeToFit>
                Rate my tinder
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
        <Link href="/pickup-lines" asChild>
          <TouchableOpacity style={styles.whiteButton}>
            <View style={styles.whiteButtonInner}>
              <Text style={styles.whiteButtonText} numberOfLines={1} adjustsFontSizeToFit>
                Get Pickup Lines
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    padding: 16,
    gap: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
  },
  whiteButton: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  whiteButtonInner: {
    padding: isSmallScreen ? 8 : 10,
    alignItems: 'center',
  },
  whiteButtonText: {
    color: '#333',
    fontSize: isSmallScreen ? 13 : 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadButton: {
    borderRadius: 32,
    overflow: 'hidden',
    height: 56,
    backgroundColor: '#000',
  },
  uploadButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
}); 