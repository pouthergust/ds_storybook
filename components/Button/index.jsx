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
      active: styles[inverseStyle ? 'containerInverse' : 'containerLarge'],
      color: styles[inverseStyle ? 'labelInverse' : 'label'],
      disabled: [styles.containerDisabled, styles.labelDisabled],
    },
    outlined: {
      active: styles.containerOutlined,
      color: styles.labelOutline
    },
    transparent: {
      active: styles.containerTertiary,
      color: styles.labelTertiary
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
    if (isFocused && !disabled) baseStyle.push(styles.containerFocused);
    
    return baseStyle;
  };

  const getLabelStyle = () => {
    const baseStyle = [styles.label];

    // Estilo inverso
    if (inverseStyle) {
      // baseStyle.push(styles.labelInverse)
      // baseStyle.push(styles.containerInverse);
    };

    // Variante
    // if (variant === 'filled') baseStyle.push(styles.label);
    if (variant === 'outline') baseStyle.push(styles.labelOutline);
    if (variant === 'tertiary') baseStyle.push(styles.labelTertiary);

    // Variante
    baseStyle.push(variantOptions[variant].color);
    // if (variant === 'inverse') baseStyle.push(styles.containerInverse);
    // if (variant === 'outline') baseStyle.push(styles[!inverseStyle ? "labelOutline" : "labelInverseOutlined"]);
    // if (variant === 'outline' && isFocused) baseStyle.push(styles.labelLight);
    // if (variant === 'tertiary') baseStyle.push(styles.containerTertiary);

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
    if (variant === 'outlined') return styles.labelOutline.color;
    return styles.labelTertiary.color;
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#4F7CFE',
  },
  containerOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2A4FDA',
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
  containerInverse: {
    backgroundColor: '#E2FF66',
  },
  containerInverseOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E2FF66',
  },
  containerFocused: {
    borderColor: '#2B5AE3',
  },
  containerDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#F5F5F5',
  },
  containerDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#F5F5F5',
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
    color: '#000000',
  },
  labelInverseOutlined: {
    color: '#E2FF66',
  },
  labelOutline: {
    color: '#4F7CFE',
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
});

export default Button;