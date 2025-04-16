import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

interface BottomButtonsProps {
  onUpload: () => void;
}

export function BottomButtons({ onUpload }: BottomButtonsProps) {
  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <LinearGradient
          colors={['#FF4D43', '#FF2D55']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.uploadButtonInner}
        >
          <Text style={styles.uploadButtonText}>Upload a Screenshot</Text>
        </LinearGradient>
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
    marginBottom: 15,
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
    padding: isSmallScreen ? 6 : 8,
    alignItems: 'center',
  },
  whiteButtonText: {
    color: '#000',
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  uploadButton: {
    borderRadius: 32,
    overflow: 'hidden',
    height: 56,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  gradientButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientButtonInner: {
    padding: isSmallScreen ? 6 : 8,
    alignItems: 'center',
    paddingVertical: 14,
  },
  gradientButtonText: {
    color: '#fff',
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
}); 