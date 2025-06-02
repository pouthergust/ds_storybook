import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from '../Icon';

const Select = ({
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
  variant = "default", // "default", "inverse"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectedOption !== value) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      const toValue = isOpen ? 0 : Math.min(options.length * 48, 240); // Max height 240px
      
      Animated.timing(dropdownHeight, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
      
      setIsOpen(!isOpen);
    }
  };

  const getContainerStyle = () => {
    const baseStyle = variant === "inverse" ? styles.containerInverse : styles.container;
    
    if (disabled) return [baseStyle, variant === "inverse" ? styles.containerInverseDisabled : styles.containerDisabled];
    if (error) return [baseStyle, variant === "inverse" ? styles.containerInverseError : styles.containerError];
    if (success) return [baseStyle, variant === "inverse" ? styles.containerInverseSuccess : styles.containerSuccess];
    if (isOpen) return [baseStyle, variant === "inverse" ? styles.containerInverseFocused : styles.containerFocused];
    return baseStyle;
  };

  const getLabelStyle = () => {
    const baseStyle = variant === "inverse" ? styles.labelInverse : styles.label;
    
    if (disabled) return [baseStyle, variant === "inverse" ? styles.labelInverseDisabled : styles.labelDisabled];
    if (error) return [baseStyle, variant === "inverse" ? styles.labelInverseError : styles.labelError];
    if (success) return [baseStyle, variant === "inverse" ? styles.labelInverseSuccess : styles.labelSuccess];
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = variant === "inverse" ? styles.textInverse : styles.text;
    
    if (disabled) return [baseStyle, variant === "inverse" ? styles.textInverseDisabled : styles.textDisabled];
    if (error) return [baseStyle, variant === "inverse" ? styles.textInverseError : styles.textError];
    if (success) return [baseStyle, variant === "inverse" ? styles.textInverseSuccess : styles.textSuccess];
    return baseStyle;
  };

  const getSupportTextStyle = () => {
    const baseStyle = variant === "inverse" ? styles.supportTextInverse : styles.supportText;
    
    if (error) return [baseStyle, variant === "inverse" ? styles.supportTextInverseError : styles.supportTextError];
    if (success) return [baseStyle, variant === "inverse" ? styles.supportTextInverseSuccess : styles.supportTextSuccess];
    return baseStyle;
  };

  const getIconColor = () => {
    if (variant === "inverse") {
      if (disabled) return 'rgba(255, 255, 255, 0.4)';
      if (error) return '#FF4D4F';
      if (success) return '#52C41A';
      return '#FFFFFF';
    }
    
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
      
      const scale = new Animated.Value(0);
      const opacity = new Animated.Value(0.6);
      
      setRipples(prev => [...prev, { 
        id: rippleId, 
        x: locationX, 
        y: locationY, 
        scale, 
        opacity 
      }]);

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
        setRipples(prev => prev.filter(r => r.id !== rippleId));
      });

      setTimeout(() => onPress(item), 150);
    };

    const itemStyle = variant === "inverse" ? styles.optionItemInverse : styles.optionItem;
    const separatorStyle = variant === "inverse" ? styles.optionItemInverseWithSeparator : styles.optionItemWithSeparator;
    const textStyle = variant === "inverse" ? styles.optionTextInverse : styles.optionText;

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            itemStyle,
            withSeparator && index !== options.length - 1 && separatorStyle
          ]}
        >
          <Text style={textStyle}>{item.label || item}</Text>
          
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

  const wrapperStyle = variant === "inverse" ? styles.wrapperInverse : styles.wrapper;
  const dropdownListStyle = variant === "inverse" ? styles.dropdownListInverse : styles.dropdownList;

  return (
    <View style={wrapperStyle}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={styles.selectContainer}>
        <TouchableOpacity
          ref={selectRef}
          style={getContainerStyle()}
          onPress={toggleDropdown}
          activeOpacity={disabled ? 1 : 0.7}
        >
          <Text style={[
            getTextStyle(),
            !selectedOption && (variant === "inverse" ? styles.placeholderTextInverse : styles.placeholderText)
          ]}>
            {selectedOption ? (selectedOption.label || selectedOption) : placeholder}
          </Text>
          
          <Icon 
            name={isOpen ? "arrow-up-s-line" : "arrow-down-s-line"} 
            size={20} 
            color={getIconColor()} 
          />
        </TouchableOpacity>

        {isOpen && (
          <Animated.View
            style={[
              dropdownListStyle,
              {
                height: dropdownHeight,
                opacity: dropdownHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }
            ]}
          >
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              bounces={false}
              nestedScrollEnabled={true}
            />
          </Animated.View>
        )}
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
  wrapperInverse: {
    width: '100%',
    gap: 4,
  },
  selectContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  
  // DEFAULT VARIANT STYLES
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
    borderWidth: 2,
    borderColor: '#4F7CFE',
    paddingHorizontal: 11,
  },
  containerError: {
    borderColor: '#FF4D4F',
    backgroundColor: '#FFF1F0',
  },
  containerSuccess: {
    borderColor: '#52C41A',
    backgroundColor: '#F6FFED',
  },
  containerDisabled: {
    borderColor: '#E6EEFF',
    backgroundColor: '#F5F5F5',
  },
  
  // INVERSE VARIANT STYLES
  containerInverse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    height: 40,
  },
  containerInverseFocused: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: 11,
  },
  containerInverseError: {
    borderColor: '#FF4D4F',
    backgroundColor: 'rgba(255, 77, 79, 0.1)',
  },
  containerInverseSuccess: {
    borderColor: '#52C41A',
    backgroundColor: 'rgba(82, 196, 26, 0.1)',
  },
  containerInverseDisabled: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  
  // LABEL STYLES
  label: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  labelError: {
    color: '#FF4D4F',
  },
  labelSuccess: {
    color: '#52C41A',
  },
  labelDisabled: {
    color: '#BFBFBF',
  },
  labelInverse: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  labelInverseError: {
    color: '#FF4D4F',
  },
  labelInverseSuccess: {
    color: '#52C41A',
  },
  labelInverseDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  
  // TEXT STYLES
  text: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  textError: {
    color: '#FF4D4F',
  },
  textSuccess: {
    color: '#52C41A',
  },
  textDisabled: {
    color: '#BFBFBF',
  },
  textInverse: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  textInverseError: {
    color: '#FF4D4F',
  },
  textInverseSuccess: {
    color: '#52C41A',
  },
  textInverseDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  
  // PLACEHOLDER STYLES
  placeholderText: {
    color: '#BFBFBF',
  },
  placeholderTextInverse: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  
  // SUPPORT TEXT STYLES
  supportText: {
    fontSize: 12,
    color: '#4F7CFE',
  },
  supportTextError: {
    color: '#FF4D4F',
  },
  supportTextSuccess: {
    color: '#52C41A',
  },
  supportTextInverse: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  supportTextInverseError: {
    color: '#FF4D4F',
  },
  supportTextInverseSuccess: {
    color: '#52C41A',
  },
  
  // DROPDOWN LIST STYLES
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6EEFF',
    marginTop: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownListInverse: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
    overflow: 'hidden',
  },
  
  // OPTION ITEM STYLES
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 48,
    justifyContent: 'center',
  },
  optionItemWithSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionItemInverse: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 48,
    justifyContent: 'center',
  },
  optionItemInverseWithSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionText: {
    fontSize: 14,
    color: '#333333',
  },
  optionTextInverse: {
    fontSize: 14,
    color: '#333333',
  },
  
  // RIPPLE EFFECT
  ripple: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 124, 254, 0.3)',
  },
});

export default Select;