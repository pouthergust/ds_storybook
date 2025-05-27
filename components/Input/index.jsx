import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from '../Icon';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  success,
  disabled,
  supportText,
  mask, // Nova prop para tipo de máscara
  maskType, // Tipo específico de máscara
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // Funções de máscara
  const applyMask = useCallback((text, type) => {
    if (!mask || !type) return text;
    
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    switch (type) {
      case 'cpf':
        return maskCPF(numbers);
      case 'cep':
        return maskCEP(numbers);
      case 'phone':
        return maskPhone(numbers);
      case 'date':
        return maskDate(numbers);
      case 'currency':
        return maskCurrency(numbers);
      default:
        return text;
    }
  }, [mask])

  const maskCPF = (value) => {
    if (value.length <= 11) {
      return value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value.slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const maskCEP = (value) => {
    if (value.length <= 8) {
      return value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
  };

  const maskPhone = (value) => {
    if (value.length <= 11) {
      if (value.length <= 10) {
        return value
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        return value
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
      }
    }
    return value.slice(0, 11)
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  const maskDate = (value) => {
    if (value.length <= 8) {
      return value
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
    }
    return value.slice(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  const maskCurrency = (value) => {
    if (!value) return '';
    
    // Converte para número e divide por 100 para ter centavos
    const numericValue = parseInt(value) / 100;
    
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleChangeText = (text) => {
    let maskedText = text;
    
    if (mask && maskType) {
      maskedText = applyMask(text, maskType);
    }
    
    setIsFilled(maskedText.length > 0);
    if (onChangeText) onChangeText(maskedText);
  };

  const getKeyboardType = () => {
    if (!mask || !maskType) return 'default';
    
    switch (maskType) {
      case 'cpf':
      case 'cep':
      case 'phone':
      case 'currency':
        return 'numeric';
      case 'date':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const getMaxLength = () => {
    if (!mask || !maskType) return undefined;
    
    switch (maskType) {
      case 'cpf':
        return 14; // 000.000.000-00
      case 'cep':
        return 9;  // 00000-000
      case 'phone':
        return 15; // (00) 00000-0000
      case 'date':
        return 10; // 00/00/0000
      case 'currency':
        return undefined; // Sem limite para moeda
      default:
        return undefined;
    }
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

  // const getIcon = () => {
  //   // Implementar quando os ícones estiverem disponíveis
  //   if (error) return ;
  //   if (success) return <Icon name="checkmark-circle" size={20} color="#52C41A" />;
  //   return <Icon name="information-line" size={20} color="#687499" />;
  //   return null;
  // };

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
          keyboardType={getKeyboardType()}
          maxLength={getMaxLength()}
        />
        {!disabled && <Icon name="information-line" size={20} color="#687499" />}
        {error && <Icon name="close-line" size={20} color="#FF4D4F" />}
        {success && <Icon name="check-line" size={20} color="#52C41A" />}
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