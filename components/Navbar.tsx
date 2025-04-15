import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as ImagePicker from 'expo-image-picker';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const insets = useSafeAreaInsets();

  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled) {
        const newId = Date.now().toString();
        router.push(`/image/${newId}?isNew=true`);
        
        if (result.assets[0].base64) {
          router.setParams({ image: encodeURIComponent(result.assets[0].base64) });
        }
      }
    } catch (err) {
      alert('Failed to pick image. Please try again.');
    }
  };

  const renderLeftButton = () => {
    if (isMainPage) {
      return (
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.profileButton}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={() => router.back()}
      >
        <View style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[
      styles.wrapper,
      { 
        paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 8,
        backgroundColor: 'transparent'
      }
    ]}>
      <View style={styles.container}>
        {renderLeftButton()}
        
        <MaskedView
          style={[styles.titleContainer, { backgroundColor: 'transparent' }]}
          maskElement={
            <View style={styles.titleMaskContainer}>
              <Text style={styles.titleMask}>RizzApp</Text>
            </View>
          }
        >
          <LinearGradient
            colors={['#FF69B4', '#FFB6C1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleGradient}
          />
        </MaskedView>

        <TouchableOpacity 
          style={[styles.iconButton, { backgroundColor: 'transparent' }]}
          onPress={handleImageUpload}
        >
          <LinearGradient
            colors={['#FF69B4', '#FFB6C1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.plusButton}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60,
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleMaskContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleMask: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  titleGradient: {
    flex: 1,
    width: '100%',
  },
}); 