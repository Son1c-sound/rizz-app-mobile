import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';

export const HISTORY_IMAGES = [
  {
    id: 1,
    image: "https://about.fb.com/wp-content/uploads/2024/04/WhatsApp_Chat-Filters-_Header.jpg",
    title: "Hey, are you a parking ticket?",
    description: "Because you've got FINE written all over you!",
    category: "Pickup Lines",
    date: "2024-03-20"
  },
  {
    id: 2,
    image: "https://about.fb.com/wp-content/uploads/2024/04/WhatsApp_Chat-Filters-_Header.jpg",
    title: "Are you French?",
    description: "Because Eiffel for you!",
    category: "Pickup Lines",
    date: "2024-03-19"
  },
 
];

interface HistoryImageProps {
  id: number;
  url: string;
}

const { width } = Dimensions.get('window');
const GRID_SPACING = 8;
const IMAGE_WIDTH = (width - 32 - (GRID_SPACING * 2)) / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.6;

export function HistoryImage({ id, url }: HistoryImageProps) {
  return (
    <Link href={`/image/${id}`} asChild>
      <TouchableOpacity style={styles.historyImageContainer}>
        <View style={styles.historyImage}>
          <Image 
            source={{ uri: url }} 
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteX}>✕</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  historyImageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginHorizontal: GRID_SPACING/2,
    marginBottom: GRID_SPACING,
    position: 'relative',
  },
  historyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteX: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
}); 