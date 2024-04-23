import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native';
import React from 'react';
import TextComponents from './TextComponents';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
}

const TitleComponents = (props: Props) => {
  const {text, size, font, color, flex} = props;
  return (
    <TextComponents
      size={size ?? 20}
      font={font ?? fontFamilies.semiBold}
      color={color ?? colors.text}
      text={text}
      flex={flex ?? 1}
    />
  );
};

export default TitleComponents;
