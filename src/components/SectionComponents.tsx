import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const SectionComponents = (props: Props) => {
  const {children, styles} = props;
  return <View style={[globalStyles.section, styles]}>{children}</View>;
};

export default SectionComponents;

const styles = StyleSheet.create({});
