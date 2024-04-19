import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const CardComponents = (props: Props) => {
  const {children, styles, bgColor} = props;
  return (
    <View style={[globalStyles.inputContainer, {padding: 12}, styles]}>
      {children}
    </View>
  );
};

export default CardComponents;

const styles = StyleSheet.create({});
