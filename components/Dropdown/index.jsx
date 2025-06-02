import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from '../Icon';

const { height: screenHeight } = Dimensions.get('window');

const Dropdown = ({
  label,
  placeholder = "Selecione uma opção",
  value,
  onSelect,
  options = [],
  error,
  success,
  disabled,
  supportText,
  withSeparator = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const getContainerStyle = () => {
    if (disabled) return styles.containerDisabled;
    if (error) return styles.containerError;
    if (success) return styles.containerSuccess;
    if (isOpen) return styles.containerFocused;
    return styles.container;
  };

  const getLabelStyle = () => {
    if (disabled) return styles.labelDisabled;
    if (error) return styles.labelError;
    if (success) return styles.labelSuccess;
    return styles.label;
  };

  const getTextStyle = () => {
    if (disabled) return styles.textDisabled;
    if (error) return styles.textError;
    if (success) return styles.textSuccess;
    return styles.text;
  };

  const getSupportTextStyle = () => {
    if (error) return styles.supportTextError;
    if (success) return styles.supportTextSuccess;
    return styles.supportText;
  };

  const getIconColor = () => {
    if (disabled) return '#BFBFBF';
    if (error) return '#FF4D4F';
    if (success) return '#52C41A';
    return '#687499';
  };

  const RippleItem = ({ item, index, onPress }) => {
    const [ripples, setRipples] = useState([]);

    const handlePress = (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const rippleId = Date.now();
      
      // Criar nova animação de ripple
      const scale = new Animated.Value(0);
      const opacity = new Animated.Value(0.6);
      
      setRipples(prev => [...prev, { 
        id: rippleId, 
        x: locationX, 
        y: locationY, 
        scale, 
        opacity 
      }]);

      // Iniciar animação
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 4,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start(() => {
        // Remover ripple após animação
        setRipples(prev => prev.filter(r => r.id !== rippleId));
      });

      // Chamar onPress após um pequeno delay para mostrar o efeito
      setTimeout(() => onPress(item), 150);
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            styles.optionItem,
            withSeparator && index !== options.length - 1 && styles.optionItemWithSeparator
          ]}
        >
          <Text style={styles.optionText}>{item.label || item}</Text>
          
          {/* Renderizar ripples */}
          {ripples.map((ripple) => (
            <Animated.View
              key={ripple.id}
              style={[
                styles.ripple,
                {
                  left: ripple.x - 20,
                  top: ripple.y - 20,
                  transform: [{ scale: ripple.scale }],
                  opacity: ripple.opacity,
                }
              ]}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item, index }) => (
    <RippleItem
      item={item}
      index={index}
      onPress={handleSelect}
    />
  );

  return (
    <View style={styles.wrapper}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <TouchableOpacity
        ref={dropdownRef}
        style={getContainerStyle()}
        onPress={toggleDropdown}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text style={[
          getTextStyle(),
          !selectedOption && styles.placeholderText
        ]}>
          {selectedOption ? (selectedOption.label || selectedOption) : placeholder}
        </Text>
        
        <Icon 
          name={isOpen ? "arrow-up-s-line" : "arrow-down-s-line"} 
          size={20} 
          color={getIconColor()} 
        />
      </TouchableOpacity>

      {supportText && <Text style={getSupportTextStyle()}>{supportText}</Text>}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.dropdownList}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecione uma opção</Text>
                <TouchableOpacity
                  onPress={() => setIsOpen(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close-line" size={24} color="#687499" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.optionsList}
                showsVerticalScrollIndicator={false}
                bounces={false}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E6EEFF',
    borderRadius: 8,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 12,
    height: 40,
  },
  containerFocused: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#4F7CFE',
    borderRadius: 8,
    backgroundColor: '#F5F8FF',
    paddingHorizontal: 11,
    height: 40,
  },
  containerError: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FF4D4F',
    borderRadius: 8,
    backgroundColor: '#FFF1F0',
    paddingHorizontal: 12,
    height: 40,
  },
  containerSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#52C41A',
    borderRadius: 8,
    backgroundColor: '#F6FFED',
    paddingHorizontal: 12,
    height: 40,
  },
  containerDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E6EEFF',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    height: 40,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  labelError: {
    fontSize: 14,
    color: '#FF4D4F',
    fontWeight: '500',
  },
  labelSuccess: {
    fontSize: 14,
    color: '#52C41A',
    fontWeight: '500',
  },
  labelDisabled: {
    fontSize: 14,
    color: '#BFBFBF',
    fontWeight: '500',
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  textError: {
    flex: 1,
    fontSize: 14,
    color: '#FF4D4F',
  },
  textSuccess: {
    flex: 1,
    fontSize: 14,
    color: '#52C41A',
  },
  textDisabled: {
    flex: 1,
    fontSize: 14,
    color: '#BFBFBF',
  },
  placeholderText: {
    color: '#BFBFBF',
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.6,
    paddingBottom: 34, // Safe area para iPhone
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  dropdownList: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  optionsList: {
    paddingHorizontal: 20,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  optionItemWithSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Dropdown;