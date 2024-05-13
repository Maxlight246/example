import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
  onPress?: () => void;
}

const CardImageComponents = (props: Props) => {
  const {children, color, onPress} = props;

  const renderCard = (
    <ImageBackground
      source={require('../assets/images/card-bg.png')}
      style={[globalStyles.card]}
      imageStyle={{borderRadius: 12}}>
      <View
        style={{
          //   position: 'absolute',
          //   top: 0,
          //   bottom: 0,
          //   right: 0,
          //   left: 0,
          borderRadius: 12,
          backgroundColor: color ?? 'rgba(113, 77, 217,0.8)',
          padding: 12,
          flex: 1,
        }}>
        {children}
      </View>
    </ImageBackground>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderCard}</TouchableOpacity>
  ) : (
    renderCard
  );
};

export default CardImageComponents;

const styles = StyleSheet.create({});
