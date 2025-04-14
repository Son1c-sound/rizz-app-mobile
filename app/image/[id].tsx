import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { HISTORY_IMAGES } from '../../components/HistoryImage';
import { Button } from '../../components/Button';
import { Navbar } from '../../components/Navbar';
import { LinearGradient } from 'expo-linear-gradient';

export default function ImageDetail() {
  const { id } = useLocalSearchParams();
  const image = HISTORY_IMAGES.find(img => img.id === Number(id));

  if (!image) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.wrapper}
    >
      <Navbar />
      <View style={styles.container}>
        <Image
          source={{ uri: image.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{image.title}</Text>
          <Text style={styles.description}>{image.description}</Text>
          <Text style={styles.category}>{image.category}</Text>
          <Text style={styles.date}>{image.date}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button variant="white" style={styles.button}>
            Generate Similar
          </Button>
          <Button variant="white" style={styles.button}>
            Save to Favorites
          </Button>
          <Button variant="black" style={styles.button}>
            Share with Friends
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get('window');
const IMAGE_ASPECT_RATIO = 4/3;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8 * IMAGE_ASPECT_RATIO,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 24,
  },
  detailsContainer: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  category: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  buttonsContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    width: '100%',
  },
}); 