import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import TitleComponents from './TitleComponents';
import TextComponents from './TextComponents';
import {colors} from '../constants/colors';
import RowComponents from './RowComponents';
import {globalStyles} from '../styles/globalStyles';
import SectionComponents from './SectionComponents';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Eye, EyeSlash} from 'iconsax-react-native';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multiple?: boolean;
  numberOfLine?: number;
  isPassword?: boolean;
}

const InputComponents = (props: Props) => {
  const {
    value,
    placeholder,
    onChange,
    title,
    prefix,
    affix,
    allowClear,
    multiple,
    numberOfLine,
    isPassword,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={{marginBottom: 16}}>
      {title && <TitleComponents text={title} flex={0} />}
      <RowComponents
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multiple && numberOfLine ? 22 * numberOfLine : 22,
            paddingVertical: 12,
            paddingHorizontal: 10,
            // alignItems: 'flex-start',
          },
        ]}>
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}>
          <TextInput
            style={{
              margin: 0,
              padding: 0,
              textAlignVertical: multiple ? 'top' : 'auto',
            }}
            placeholder={placeholder ?? ''}
            value={value}
            onChangeText={val => onChange(val)}
            multiline={multiple}
            numberOfLines={numberOfLine}
            secureTextEntry={isPassword ? !showPassword : false}
            autoCapitalize="none"
          />
        </View>
        {affix && affix}
        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeSlash size={20} color={colors.desc} />
            ) : (
              <Eye size={20} color={colors.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponents>
    </View>
  );
};

export default InputComponents;

const styles = StyleSheet.create({});
