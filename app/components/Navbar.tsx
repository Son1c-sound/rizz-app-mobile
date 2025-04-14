import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const renderRightButton = () => (
  <TouchableOpacity
    style={styles.rightButton}
    onPress={() => router.push('/upload/index')}
  >
    <LinearGradient
      colors={['#FF3B9E', '#FF3B9E']}
      style={styles.gradientButton}
    >
      <Image 
        source={{ uri: 'https://i.ibb.co/zHZ0y6Z9/123123213.png' }}
        style={{ width: 24, height: 24 }}
        resizeMode="contain"
      />
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gradientButton: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: 'hidden',
  },
}); 