import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = ({
  label,
  size = 'medium',
  variant = 'filled',
  disabled = false,
  inverseStyle = false,
  onPress,
  iconName,
  iconPosition = 'both',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const iconOnly = useMemo(() => !label && iconName, [label, iconName]);

  const sizeOptions = {
    large: {
      container: styles.containerLarge,
      color: styles.label
    },
    medium: {
      container: styles.containerMedium,
      color: styles.label
    },
    small: {
      container: styles.containerSmall,
      color: styles.label
    },
  }

  const variantOptions = {
    filled: {
      active: styles[inverseStyle ? 'containerInverse' : 'containerFilled'],
      color: styles[inverseStyle ? 'labelInverse' : 'label'],
      disabled: [styles.containerDisabled, styles.labelDisabled],
      focused: styles.containerFocused, 
    },
    outlined: {
      active: styles[inverseStyle ? 'containerInverseOutline' : 'containerOutlined'],
      color: styles[inverseStyle ? 'labelInverseOutlined' : 'labelOutline'],
      disabled: [styles.containerOutlinedDisabled, styles.labelOutlineDisabled],
      focused: [
        styles[inverseStyle ? 'containerInverseFocused' : 'containerOutlineFocused'],
        styles.containerFocused, 
      ], 
    },
    transparent: {
      active: styles.containerTertiary,
      color: styles[inverseStyle ? 'labelInverseOutlined' : 'labelOutline'],
      disabled: styles.containerTransparentDisabled,
      focused: [
        styles.containerTransparentFocused, 
        styles[inverseStyle ? 'containerInverseFocused' :'containerOutlineFocused'],
        styles.containerFocused
      ]
    },
  }

  const getContainerStyle = () => {
    const baseStyle = [styles.container];
    
    // Tamanho
    baseStyle.push(sizeOptions[size].container);

    // Variante
    baseStyle.push(variantOptions[variant][disabled ? 'disabled' : 'active']);


    // Estado
    // if (disabled) baseStyle.push(styles.containerDisabled);
    if (isFocused && !disabled) baseStyle.push(variantOptions[variant].focused);
    
    return baseStyle;
  };

  const getLabelStyle = () => {
    const baseStyle = [styles.label];

    // Variante
    baseStyle.push(variantOptions[variant].color);

    // Estado
    if (disabled) baseStyle.push(styles.labelDisabled);

    return baseStyle;
  };

  const getIconSize = () => {
    switch (size) {
      case 'large':
        return iconOnly ? 24 : 20;
      case 'medium':
        return iconOnly ? 20 : 16;
      case 'small':
        return iconOnly ? 16 : 14;
      default:
        return 20;
    }
  };

  const getIconColor = () => {
    if (disabled) return styles.labelDisabled.color;
    if (variant === 'filled') return inverseStyle ? styles.labelInverse.color : styles.label.color;

    return inverseStyle ? styles.labelInverseOutlined.color : styles.labelOutline.color;
  };

  const renderIcon = () => {
    if (!iconName) return null;
    return (
      <Ionicons
        name={iconName}
        size={getIconSize()}
        color={getIconColor()}
        style={styles.icon}
      />
    );
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), iconOnly && styles.iconOnlyContainer]}
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      activeOpacity={0.8}
    >
      <View style={styles.contentContainer}>
        {(
          iconPosition === 'left' ||
          iconPosition === 'both' ) && 
          renderIcon()
        }
        {!iconOnly && <Text style={getLabelStyle()}>{label}</Text>}
        {(
          iconPosition === 'right' ||
          iconPosition === 'both' ) && 
          renderIcon()
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
  },
  containerFilled: {
    borderColor: '#4F7CFE',
    backgroundColor: '#4F7CFE',
  },
  containerInverse: {
    borderColor: '#E2FF66',
    backgroundColor: '#E2FF66',
  },
  containerDisabled: {
    backgroundColor: '#F5F5F5',
    border: 'none',
  },
  containerOutlined: {
    borderWidth: 2,
    borderColor: '#2A4FDA',
  },
  containerInverseOutline: {
    borderWidth: 1,
    borderColor: '#E2FF66',
  },
  containerOutlinedDisabled: {
    borderColor: '#C0C9E5',
  },
  containerTransparentDisabled: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: '#96A1C1',
  },
  containerFocused: {
    outlineWidth: 4,
    outlineStyle: "solid",
    borderColor: '#6684FF',
  },
  containerOutlineFocused: {
    backgroundColor: '#E3E9FF',
  },  
  containerTransparentFocused: {
    borderColor: '#6684FF',
  },
  containerLarge: {
    height: 56,
    paddingHorizontal: 16,
  },
  containerMedium: {
    height: 40,
    paddingHorizontal: 16,
  },
  containerSmall: {
    height: 32,
    paddingHorizontal: 12,
  },
  icon: {
    paddingHorizontal: 8,
  },
  iconLeft: {
    paddingLeft: 0,
  },
  iconRight: {
    paddingRight: 0,
  },
  iconOnlyContainer: {
    padding: 0,
    aspectRatio: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E7F79E',
  },
  labelLight: {
    color: '#FFFFFF',
  },
  labelInverse: {
    color: '#4F7CFE',
  },
  labelInverseOutlined: {
    color: '#E2FF66',
  },
  labelOutline: {
    color: '#4F7CFE',
  },
  labelOutlineDisabled: {
    color: '#C0C9E5',
  },
  labelDisabled: {
    color: '#BFBFBF',
  },
  containerTertiary: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  labelTertiary: {
    color: '#2A4FDA',
  },
  labelInverseTertiary: {
    color: '#E7F79E',
  },
  containerInverseFocused: {
    borderColor: '#E7F79E',
  },
});

export default Button;