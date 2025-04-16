import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  id: string;
  url: string;
  onDelete: (id: string) => void;
}

const { width } = Dimensions.get('window');
const GRID_SPACING = 8;
const IMAGE_WIDTH = (width - 32 - (GRID_SPACING * 2)) / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.6;

export function HistoryImage({ id, url, onDelete }: HistoryImageProps) {
  const handleDelete = (e: GestureResponderEvent) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    onDelete(id);
  };

  return (
    <Link href={`/image/${id}`} asChild>
      <TouchableOpacity 
        style={styles.historyImageContainer}
        activeOpacity={0.9}
      >
        <View style={styles.historyImage}>
          <Image 
            source={{ uri: `data:image/jpeg;base64,${url}` }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDelete}
          >
            <Ionicons name="close" size={16} color="#fff" />
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
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 