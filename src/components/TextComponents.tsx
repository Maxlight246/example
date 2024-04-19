import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
}

const TextComponents = (props: Props) => {
  const {text, size, font, color, flex, styles} = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          color: color ?? colors.desc,
          flex: flex ?? 1,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponents;

const styles = StyleSheet.create({});