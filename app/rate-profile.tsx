import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from '../components/Navbar';
import { useProfileRating, ProfileRatingResponse } from '../hooks/useProfileRating';

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
      disabled={selectedImages.length >= 4}
    >
      <Ionicons name="add-circle-outline" size={32} color="#666" />
      <Text style={styles.imagePickerText}>
        Add Photo ({selectedImages.length}/4)
      </Text>
    </TouchableOpacity>
  );

  const renderSelectedImages = () => (
    <View style={styles.selectedImagesContainer}>
      {selectedImages.map((image, index) => (
        <View key={index} style={styles.selectedImageWrapper}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${image}` }}
            style={styles.selectedImage}
          />
          {!savedRating && (
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => removeImage(index)}
            >
              <Ionicons name="close-circle" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      {!savedRating && selectedImages.length < 4 && renderImagePicker()}
    </View>
  );

  const renderAnalysisForm = () => (
    <>
      {renderSelectedImages()}
      
      <TextInput
        style={styles.bioInput}
        placeholder="Write something about yourself..."
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
        numberOfLines={4}
        maxLength={500}
        editable={!savedRating}
      />
      
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
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Analyzing...' : 'Analyze My Profile'}
        </Text>
      </TouchableOpacity>
    </>
  );

  const renderRatingResult = (result: ProfileRatingResponse) => (
    <View style={styles.resultContainer}>
      <Text style={styles.headerText}>{result.headerText}</Text>

      <View style={styles.progressContainer}>
        <Progress.Circle
          size={200}
          progress={result.profileRating / 100}
          thickness={15}
          color="#FF69B4"
          unfilledColor="#FFE5EE"
          borderWidth={0}
          strokeCap="round"
          showsText
          formatText={() => `${Math.round(result.profileRating)}`}
          textStyle={styles.progressText}
        />
        <View style={styles.ratingLabelContainer}>
          <Text style={styles.ratingValue}>out of 100</Text>
          <Text style={styles.ratingLabel}>Profile Rating</Text>
        </View>
      </View>
      
      <View style={styles.tipsSection}>
        <Text style={styles.tipsHeader}>How to fix your L's</Text>

        <View style={styles.tipsContainer}>
          <View style={styles.tipCard}>
            <View style={[styles.tipIcon, { backgroundColor: '#EDF5FF' }]}>
              <Ionicons name="camera" size={24} color="#4A90E2" />
            </View>
            <Text style={styles.tipText}>{result.tip1}</Text>
          </View>
          
          <View style={styles.tipCard}>
            <View style={[styles.tipIcon, { backgroundColor: '#F8E7FB' }]}>
              <Ionicons name="create" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.tipText}>{result.tip2}</Text>
          </View>
          
          <View style={styles.tipCard}>
            <View style={[styles.tipIcon, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="star" size={24} color="#E53935" />
            </View>
            <Text style={styles.tipText}>{result.tip3}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Navbar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Rate My Tinder Profile</Text>
        
        {savedRating ? (
          <>
            {renderSelectedImages()}
            {renderRatingResult(savedRating.result)}
          </>
        ) : (
          renderAnalysisForm()
        )}
      </ScrollView>

      {savedRating && (
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Analyze Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  selectedImageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  imagePicker: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  bioInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    marginBottom: 24,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#E53935',
    marginBottom: 16,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 32,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    alignItems: 'center',
    gap: 32,
    paddingTop: 16,
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 28,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  progressText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
  },
  ratingLabelContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  ratingValue: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  ratingLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  tipsSection: {
    width: '100%',
    gap: 16,
    marginTop: 8,
  },
  tipsHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  tipsContainer: {
    gap: 16,
    width: '100%',
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: '100%',
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  resetButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 150,
  },
}); 