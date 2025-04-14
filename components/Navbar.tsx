import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const insets = useSafeAreaInsets();

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
    <View style={{ paddingTop: Platform.OS === 'ios' ? insets.top : insets.top + 8 }}>
      <View style={styles.container}>
        {renderLeftButton()}
        
        <Text style={styles.title}>RizzApp</Text>

        <TouchableOpacity style={styles.iconButton}>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
}); 