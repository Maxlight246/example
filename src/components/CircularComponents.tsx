import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number;
  titleFontSize?: number;
}

const CircularComponents = (props: Props) => {
  const {value, maxValue, color, radius, titleFontSize} = props;
  return (
    <View>
      <CircularProgress
        value={value}
        activeStrokeColor={color ?? colors.blue}
        inActiveStrokeColor={colors.gray2}
        title={`${value}%`}
        showProgressValue={false}
        titleColor={colors.text}
        titleFontSize={titleFontSize ?? 20}
        titleStyle={{
          fontFamily: fontFamilies.semiBold,
        }}
        radius={radius ?? 46}
      />
    </View>
  );
};

export default CircularComponents;

const styles = StyleSheet.create({});
