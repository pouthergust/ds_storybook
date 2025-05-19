import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const FilterTag = ({ label, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = () => {
    const baseStyle = [styles.container];
    
    if (isHovered) baseStyle.push(styles.containerHovered);
    if (isFocused) baseStyle.push(styles.containerFocused);

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeIcon}>×</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#96ACFF',
  },
  containerHovered: {
    backgroundColor: '#E3E9FF',
  },
  containerFocused: {
    borderColor: '#4F7CFE',
    outlineWidth: 3,
    outlineColor: '#6684FF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#4F7CFE',
    marginRight: 4,
  },
  removeButton: {
    padding: 2,
  },
  removeIcon: {
    fontSize: 16,
    color: '#4F7CFE',
    fontWeight: 'bold',
  },
});

export default FilterTag;