import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const SpaceComponents = (props: Props) => {
  const {width, height} = props;
  return <View style={{width, height}}></View>;
};

export default SpaceComponents;

const styles = StyleSheet.create({});
