import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Navbar } from '../components/Navbar';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
  const handleTerms = () => {
    Linking.openURL('https://policies-opal.vercel.app/terms');
  };

  const handlePrivacy = () => {
    Linking.openURL('https://policies-opal.vercel.app/privacy');
  };

  const socialLinks = [
    { 
      icon: 'logo-twitter', 
      url: 'https://twitter.com/rizzapp', 
      label: 'Twitter',
      gradient: ['#1DA1F2', '#0D8BD9'] as const
    },
    { 
      icon: 'logo-tiktok', 
      url: 'https://tiktok.com/@rizzapp', 
      label: 'TikTok',
      gradient: ['#000000', '#00F2EA'] as const
    },
    { 
      icon: 'logo-instagram', 
      url: 'https://instagram.com/rizzapp', 
      label: 'Instagram',
      gradient: ['#833AB4', '#FD1D1D'] as const
    },
  ];

  return (
    <LinearGradient
      colors={['#ffffff', '#fff8f8']}
      style={styles.wrapper}
    >
      <Navbar />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.topSection}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Connect with RizzUP</Text>
              <View style={styles.socialContainer}>
                {socialLinks.map((link, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Linking.openURL(link.url)}
                    style={styles.socialWrapper}
                  >
                    <LinearGradient
                      colors={link.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.socialButton}
                    >
                      <Ionicons name={link.icon as keyof typeof Ionicons.glyphMap} size={24} color="#fff" />
                      <Text style={styles.socialLabel}>{link.label}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.legalButtons}>
              <TouchableOpacity style={styles.legalButton} onPress={handleTerms}>
                <View style={styles.legalButtonInner}>
                  <Text style={styles.legalButtonText}>Terms of Service</Text>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.legalButton} onPress={handlePrivacy}>
                <View style={styles.legalButtonInner}>
                  <Text style={styles.legalButtonText}>Privacy Policy</Text>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  topSection: {
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  socialContainer: {
    gap: 12,
  },
  socialWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  socialLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  legalButtons: {
    gap: 12,
  },
  legalButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  legalButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  legalButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});