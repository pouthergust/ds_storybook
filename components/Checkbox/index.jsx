import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from '../Icon'

const Checkbox = ({ label, checked, disabled, variant, onChange }) => {
  const getIcon = () => {
    if (!checked || variant == 'empty') return null;

    return (
      <Icon
        name={variant}
        size={14}
        color={disabled ? "#96A1C1" : "#FFF"}
      />
    )
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.containerDisabled,
      ]}
      onPress={onChange}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkbox,
          checked && styles.checkboxChecked,
          disabled && styles.checkboxDisabled,
        ]}
      >
        {checked && (
          <Text style={[
            styles.icon,
            disabled && styles.iconDisabled,
          ]}>
            {getIcon()}
          </Text>
        )}
      </View>
      {label && (
        <Text style={[
          styles.label,
          disabled && styles.labelDisabled,
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['empty', 'check-line', 'subtract-line']),
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  label: '',
  checked: false,
  disabled: false,
  variant: 'empty',
  onChange: () => {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4F7CFE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxChecked: {
    backgroundColor: '#4F7CFE',
  },
  checkboxDisabled: {
    backgroundColor: '#F4F4F4',
    borderColor: '#96A1C1',
  },
  icon: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconDisabled: {
    color: '#A1A1A1',
  },
  label: {
    fontSize: 14,
    color: '#1F1F1F',
  },
  labelDisabled: {
    color: '#A1A1A1',
  },
});

export default Checkbox;
