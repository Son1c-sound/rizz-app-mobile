import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '../components/Navbar';
import { useProfileRating, ProfileRatingResponse } from '../hooks/useProfileRating';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 48) / 2;

export default function RateProfile() {
  const {
    pickImage,
    removeImage,
    getRating,
    resetRating,
    selectedImages,
    savedRating,
    isLoading,
    error,
  } = useProfileRating();

  const [aboutMe, setAboutMe] = useState(savedRating?.aboutMe || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    await getRating(aboutMe);
  };

  const handleReset = async () => {
    await resetRating();
    setAboutMe('');
    setIsAnalyzing(false);
  };

  const renderImagePicker = () => (
    <TouchableOpacity
      style={styles.imagePicker}
      onPress={pickImage}
      disabled={selectedImages.length >= 6}
    >
      <LinearGradient
        colors={['#FF4D43', '#FF2D55']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.imagePickerGradient}
      >
        <Ionicons name="add-circle-outline" size={32} color="#fff" />
        <Text style={[styles.imagePickerText, { color: '#fff' }]}>
          Add Photos ({selectedImages.length}/6)
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSelectedImages = () => (
    <View style={styles.selectedImagesContainer}>
      {selectedImages.map((image, index) => (
        <Animated.View 
          key={index} 
          entering={FadeInUp.delay(index * 100)}
          style={styles.selectedImageWrapper}
        >
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.selectedImage}
          />
          {!savedRating && (
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => removeImage(index)}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
                style={styles.removeImageGradient}
              >
                <Ionicons name="close" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </Animated.View>
      ))}
      {!savedRating && selectedImages.length < 6 && renderImagePicker()}
    </View>
  );

  const renderAnalysisForm = () => (
    <Animated.View entering={FadeIn} style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Your Photos</Text>
      {renderSelectedImages()}
      
      <Text style={styles.sectionTitle}>About You (Bio from tinder)</Text>
      <View style={styles.bioContainer}>
        <TextInput
          style={styles.bioInput}
          placeholder="Type here..."
          value={aboutMe}
          onChangeText={setAboutMe}
          multiline
          numberOfLines={4}
          maxLength={500}
          editable={!savedRating}
          placeholderTextColor="#999"
        />
        <Text style={styles.charCount}>{aboutMe.length}/500</Text>
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.submitButton,
          (isLoading || selectedImages.length === 0 || !aboutMe) && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={isLoading || selectedImages.length === 0 || !aboutMe}
      >
        <LinearGradient
          colors={['#FF4D43', '#FF2D55']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.submitButtonInner}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Analyzing...' : 'Rate My Profile'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderRatingResult = (result: ProfileRatingResponse) => (
    <Animated.View entering={FadeIn} style={styles.resultContainer}>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Profile Score</Text>
        <Progress.Circle
          size={160}
          progress={result.profileRating / 100}
          thickness={15}
          color="#FF4D43"
          unfilledColor="#FFE5E3"
          borderWidth={0}
          strokeCap="round"
          showsText
          formatText={() => `${Math.round(result.profileRating)}`}
          textStyle={{ fontSize: 48, fontWeight: '800', color: '#FF4D43' }}
        />
        <View style={styles.scoreDetails}>
          <Text style={styles.scoreSubtitle}>{result.headerText}</Text>
        </View>
      </View>

      <View style={styles.miniImagesContainer}>
        {selectedImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.miniImage}
          />
        ))}
      </View>

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>How to fix your L's</Text>
        <View style={styles.tipsContainer}>
          {[result.tip1, result.tip2, result.tip3].map((tip, index) => (
            <Animated.View 
              key={index}
              entering={FadeInUp.delay(index * 200)}
              style={styles.tipCard}
            >
              <Text style={styles.tipNumber}>{index + 1})</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </Animated.View>
  );

  const getTipColor = (index: number) => {
    const colors = [
      { bg: '#EDF5FF', icon: '#4A90E2' },
      { bg: '#E6F0FF', icon: '#2B6CB0' },
      { bg: '#EBF4FF', icon: '#3182CE' },
    ];
    return colors[index];
  };

  const getTipIcon = (index: number) => {
    const icons = ['camera', 'create', 'star'];
    return icons[index] as keyof typeof Ionicons.glyphMap;
  };

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (savedRating) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [savedRating]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Navbar />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!savedRating && <Text style={styles.title}>Rate My Profile</Text>}
        {savedRating ? renderRatingResult(savedRating.result) : renderAnalysisForm()}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {savedRating && (
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <LinearGradient
              colors={['#FF4D43', '#FF2D55']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.resetButtonInner}
            >
              <Text style={styles.resetButtonText}>Rate Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  formContainer: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',

  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
   
  },
  selectedImageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  removeImageGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePicker: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imagePickerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  bioContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  bioInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  errorText: {
    color: '#E53935',
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonInner: {
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  resultContainer: {
    gap: 32,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  scoreDetails: {
    alignItems: 'center',
    marginTop: 16,
  },
  miniImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  miniImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  progressText: {
    fontSize: 48,
    fontWeight: '800',
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  tipsSection: {
    gap: 16,
  },
  tipsTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 16,
  },
  tipsContainer: {
    gap: 8,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4D43',
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  resetButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  resetButton: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  resetButtonInner: {
    padding: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  bottomSpacing: {
    height: 80,
  },
}); 