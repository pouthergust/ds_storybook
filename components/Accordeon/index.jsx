import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ title, content, nested = false, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isFocused, setIsFocused] = useState(false);
  const animation = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(prev => !prev);
  };

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500],
  });

  const contentOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const iconRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[
      styles.container,
      nested && styles.containerNested,
    ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.header,
          isFocused && !isOpen && styles.headerFocused,
          isOpen && !nested && styles.headerActive,
        ]}
        onPress={toggleAccordion}
        onPressIn={() => setIsFocused(true)}
        onPressOut={() => setIsFocused(false)}
      >
        <Text style={[styles.headerText, isOpen && !nested && styles.headerTextActive]}>
          {title}
        </Text>
        <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={isOpen && !nested ? '#FFFFFF' : '#4F7CFE'}
          />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[
        styles.animatedContent,
        { maxHeight: contentHeight, opacity: contentOpacity }
      ]}>
        <View style={[
          styles.content,
          !nested && {
            borderTopColor: '#96ACFF',
            borderTopWidth: 2,
          },
        ]}>
          {content}
          {/* <Text style={styles.contentText}>{content}</Text> */}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#96ACFF',
    backgroundColor: '#FFF'
  },
  containerNested: {
    borderColor: '#E2E9FC',
    borderWidth: 1,
  },
  header: {
    borderRadius: 8,
    borderTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    margin: -1,
  },
  headerFocused: {
    borderColor: '#4F7CFE',
  },
  headerActive: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: '#4F7CFE',
    borderColor: '#4F7CFE',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1B244B',
  },
  headerTextActive: {
    color: '#FFFFFF',
  },
  animatedContent: {
    overflow: 'hidden',
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    width: '100%',
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1B244B',
  },
});

export default Accordion;
