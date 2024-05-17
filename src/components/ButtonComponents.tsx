import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponents';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  icon?: ReactNode;
  onPress: () => void;
  color?: string;
  isLoading?: boolean;
  styles?: StyleProp<ViewStyle>;
  disable?: boolean;
}

const ButtonComponent = (props: Props) => {
  const {text, icon, onPress, color, isLoading, styles, disable} = props;

  return (
    <TouchableOpacity
      disabled={isLoading || disable}
      onPress={onPress}
      style={[
        {
          backgroundColor: color
            ? color
            : isLoading || disable
            ? colors.gray2
            : colors.blue,
          padding: 16,
          width: '100%',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles,
      ]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          size={16}
          styles={{textTransform: 'uppercase'}}
        />
      )}
    </TouchableOpacity>
  );
};
export default ButtonComponent;
