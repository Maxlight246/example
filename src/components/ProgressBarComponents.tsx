import {DimensionValue, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import RowComponents from './RowComponents';
import TextComponents from './TextComponents';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  size?: 'small' | 'default' | 'large';
  color?: string;
  percent: DimensionValue;
}

const ProgressBarComponents = (props: Props) => {
  const {size, color, percent} = props;
  const heightContent = size === 'small' ? 6 : size === 'large' ? 10 : 8;
  return (
    <View
      style={{
        marginTop: 12,
        marginBottom: 16,
      }}>
      <View
        style={{
          width: '100%',
          height: heightContent,
          backgroundColor: 'rgba(0, 0, 0,0.3)',
          borderRadius: 100,
        }}>
        <View
          style={{
            width: percent,
            backgroundColor: color ?? colors.blue,
            height: heightContent,
            borderRadius: 100,
          }}
        />
      </View>
      <RowComponents styles={{justifyContent: 'space-between', marginTop: 4}}>
        <TextComponents text="Progress" size={12} />
        <TextComponents
          text={`${percent}`}
          size={12}
          flex={0}
          font={fontFamilies.bold}
        />
      </RowComponents>
    </View>
  );
};

export default ProgressBarComponents;

const styles = StyleSheet.create({});
