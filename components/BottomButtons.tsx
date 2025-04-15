import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

export function BottomButtons() {
  return (
    <View style={styles.bottomButtons}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.whiteButton}>
          <View style={styles.whiteButtonInner}>
            <Text style={styles.whiteButtonText} numberOfLines={1} adjustsFontSizeToFit>
              Rate my tinder
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteButton}>
          <View style={styles.whiteButtonInner}>
            <Text style={styles.whiteButtonText} numberOfLines={1} adjustsFontSizeToFit>
              Get Pickup Lines
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.uploadButton}>
        <View style={styles.uploadButtonInner}>
          <Text style={styles.uploadButtonText}>Upload a Screenshot</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    padding: 16,
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    gap: 12,
  },
  whiteButton: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  whiteButtonInner: {
    padding: isSmallScreen ? 10 : 13,
    alignItems: 'center',
  },
  whiteButtonText: {
    color: '#333',
    fontSize: isSmallScreen ? 14 : 16,
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