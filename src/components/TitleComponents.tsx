import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextComponents from './TextComponents';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
}

const TitleComponents = (props: Props) => {
  const {text, size, font, color} = props;
  return (
    <TextComponents
      size={size ?? 20}
      font={font ?? fontFamilies.semiBold}
      color={color ?? colors.text}
      text={text}
    />
  );
};

export default TitleComponents;

const styles = StyleSheet.create({});
