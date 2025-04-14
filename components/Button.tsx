import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'white' | 'black' | 'gradient';
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({ 
  children, 
  variant = 'white', 
  onPress, 
  style,
  textStyle 
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'black' && styles.blackButton,
        variant === 'white' && styles.whiteButton,
        style
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        variant === 'black' && styles.blackText,
        variant === 'white' && styles.whiteText,
        textStyle
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    overflow: 'hidden',
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteButton: {
    backgroundColor: '#fff',
  },
  blackButton: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  whiteText: {
    color: '#333',
  },
  blackText: {
    color: '#fff',
  },
}); 