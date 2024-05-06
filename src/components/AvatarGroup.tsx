import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RowComponents from './RowComponents';
import TextComponents from './TextComponents';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  uids: string[];
}

const AvatarGroup = (props: Props) => {
  const {uids} = props;
  const uidsLength = 10;
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
  };
  return (
    <RowComponents styles={{justifyContent: 'flex-start'}}>
      {Array.from({length: 10}).map(
        (item, index) =>
          index < 3 && (
            <Image
              source={require('../assets/images/card-bg.png')}
              key={`image${index}`}
              style={[
                imageStyle,
                {
                  marginLeft: index > 0 ? -10 : 0,
                },
              ]}
            />
          ),
      )}
      {uidsLength > 3 && (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: 'coral',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              marginLeft: -10,
            },
          ]}>
          <TextComponents
            flex={0}
            styles={{lineHeight: 19}}
            font={fontFamilies.semiBold}
            text={`+${uidsLength - 3 > 9 ? 9 : uidsLength - 3}`}
          />
        </View>
      )}
    </RowComponents>
  );
};

export default AvatarGroup;

const styles = StyleSheet.create({});
