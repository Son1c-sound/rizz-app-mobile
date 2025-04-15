import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Navbar } from '../components/Navbar';

export default function ProfilePage() {
  const socialLinks = [
    { icon: 'logo-twitter', url: 'https://twitter.com/rizzapp', label: 'Twitter' },
    { icon: 'logo-tiktok', url: 'https://tiktok.com/@rizzapp', label: 'TikTok' },
    { icon: 'logo-instagram', url: 'https://instagram.com/rizzapp', label: 'Instagram' },
  ];

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        {/* Social Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialButton}
                onPress={() => Linking.openURL(link.url)}
              >
                <Ionicons name={link.icon as keyof typeof Ionicons.glyphMap} size={24} color="#333" />
                <Text style={styles.socialLabel}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Legal Links */}
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
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  socialButton: {
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    minWidth: 100,
  },
  socialLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  legalButtons: {
    gap: 12,
    marginTop: 32,
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