import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import TextComponents from './TextComponents';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  color?: string;
  tagStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const TagComponents = (props: Props) => {
  const {text, color, tagStyle, textStyle, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        globalStyles.tag,
        tagStyle,
        {backgroundColor: color ?? colors.blue},
      ]}>
      <TextComponents text={text} styles={textStyle} />
    </TouchableOpacity>
  );
};

export default TagComponents;

const styles = StyleSheet.create({});
