import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function ProfilePage() {
  const socialLinks = [
    { icon: 'logo-twitter', url: 'https://twitter.com/rizzapp' },
    { icon: 'logo-tiktok', url: 'https://tiktok.com/@rizzapp' },
    { icon: 'logo-instagram', url: 'https://instagram.com/rizzapp' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.socialContainer}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={() => Linking.openURL(link.url)}
            >
              <Ionicons name={link.icon} size={24} color="#333" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.legalButtons}>
          <Link href="/terms" asChild>
            <TouchableOpacity style={styles.legalButton}>
              <Text style={styles.legalButtonText}>Terms of Service</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/privacy" asChild>
            <TouchableOpacity style={styles.legalButton}>
              <Text style={styles.legalButtonText}>Privacy Policy</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 32,
  },
  socialButton: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 12,
  },
  legalButtons: {
    gap: 12,
    marginBottom: 32,
  },
  legalButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  legalButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
}); 