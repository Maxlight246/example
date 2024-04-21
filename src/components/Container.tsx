import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
}

const Container = (props: Props) => {
  const {title, children, back, right} = props;
  return (
    <ScrollView
      style={[globalStyles.container]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default Container;

const styles = StyleSheet.create({});
