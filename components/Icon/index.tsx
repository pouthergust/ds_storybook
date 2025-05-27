import React from 'react';
import IconRemix from 'react-native-remix-icon';

interface IconProps {
  name: typeof iconEnums[keyof typeof iconEnums];
  size?: number;
  color?: string;
  style?: any;
}

const Icon = ({
  name, 
  size = 24, 
  color = "#4F7CFE",
  style
}: IconProps) => <IconRemix {...{ style, size, color, name }} />


export default Icon;
