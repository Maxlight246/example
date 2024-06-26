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
  line?: number;
  textDecorationLine?: boolean;
}

const TextComponents = (props: Props) => {
  const {text, size, font, color, flex, styles, line, textDecorationLine} =
    props;
  return (
    <Text
      numberOfLines={line}
      style={[
        globalStyles.text,
        {
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          color: color ?? colors.desc,
          flex: flex ?? 1,
          textDecorationLine: textDecorationLine ? 'line-through' : 'none',
          textDecorationStyle: 'dashed',
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponents;

const styles = StyleSheet.create({});
