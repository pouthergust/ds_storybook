import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  success,
  disabled,
  supportText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleChangeText = (text) => {
    setIsFilled(text.length > 0);
    if (onChangeText) onChangeText(text);
  };

  const getContainerStyle = () => {
    if (disabled) return styles.containerDisabled;
    if (error) return styles.containerError;
    if (success) return styles.containerSuccess;
    if (isFocused) return styles.containerFocused;
    return styles.container;
  };

  const getLabelStyle = () => {
    if (disabled) return styles.labelDisabled;
    if (error) return styles.labelError;
    if (success) return styles.labelSuccess;
    return styles.label;
  };

  const getInputStyle = () => {
    if (disabled) return styles.inputDisabled;
    if (error) return styles.inputError;
    if (success) return styles.inputSuccess;
    return styles.input;
  };

  const getSupportTextStyle = () => {
    if (error) return styles.supportTextError;
    if (success) return styles.supportTextSuccess;
    return styles.supportText;
  };

  const getIcon = () => {
    if (error) return <Ionicons name="close-circle" size={20} color="#FF4D4F" />;
    if (success) return <Ionicons name="checkmark-circle" size={20} color="#52C41A" />;
    return <Ionicons name="information-circle" size={20} color="#4F7CFE" />;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={getLabelStyle()}>{label}</Text>
      <View style={getContainerStyle()}>
        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />
        {getIcon()}
      </View>
      {supportText && <Text style={getSupportTextStyle()}>{supportText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EEFF',
    borderRadius: 8,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 12,
  },
  containerFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4F7CFE',
    borderRadius: 8,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 11,
  },
  containerError: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4D4F',
    borderRadius: 8,
    backgroundColor: '#FFF1F0',
    paddingHorizontal: 12,
  },
  containerSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#52C41A',
    borderRadius: 8,
    backgroundColor: '#F6FFED',
    paddingHorizontal: 12,
  },
  containerDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6EEFF',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: '#333333',
  },
  labelError: {
    fontSize: 14,
    color: '#FF4D4F',
  },
  labelSuccess: {
    fontSize: 14,
    color: '#52C41A',
  },
  labelDisabled: {
    fontSize: 14,
    color: '#BFBFBF',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333333',
    fontSize: 14,
  },
  inputError: {
    flex: 1,
    height: 40,
    color: '#FF4D4F',
    fontSize: 14,
  },
  inputSuccess: {
    flex: 1,
    height: 40,
    color: '#52C41A',
    fontSize: 14,
  },
  inputDisabled: {
    flex: 1,
    height: 40,
    color: '#BFBFBF',
    fontSize: 14,
  },
  supportText: {
    fontSize: 12,
    color: '#4F7CFE',
  },
  supportTextError: {
    fontSize: 12,
    color: '#FF4D4F',
  },
  supportTextSuccess: {
    fontSize: 12,
    color: '#52C41A',
  },
});

export default Input;