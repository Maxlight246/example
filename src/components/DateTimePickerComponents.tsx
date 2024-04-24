import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TitleComponents from './TitleComponents';
import RowComponents from './RowComponents';
import {Add, ArrowDown, ArrowDown2} from 'iconsax-react-native';
import TextComponents from './TextComponents';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import SpaceComponents from './SpaceComponents';
import DatePicker from 'react-native-date-picker';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title?: string;
  placeholder?: string;
  selected: Date;
  onSelect: (val: Date) => void;
}

const DateTimePickerComponents = (props: Props) => {
  const {type, title, placeholder, selected, onSelect} = props;
  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());
  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponents text={title} flex={0} />}
        <RowComponents
          onPress={() => setIsVisibleModalDateTime(true)}
          styles={[
            globalStyles.inputContainer,
            {
              marginTop: title ? 8 : 0,
              paddingVertical: 16,
            },
          ]}>
          <TextComponents
            flex={1}
            text={
              selected
                ? type === 'time'
                  ? `${selected.getHours()}:${selected.getMinutes()}`
                  : `${selected.getDate()}/${
                      selected.getMonth() + 1
                    }/${selected.getFullYear()}`
                : placeholder
                ? placeholder
                : ''
            }
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </RowComponents>
      </View>

      <Modal visible={isVisibleModalDateTime} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              margin: 20,
              width: '90%',
              backgroundColor: colors.gray,
              padding: 20,
              borderRadius: 20,
            }}>
            <View>
              <DatePicker
                mode={type ?? 'datetime'}
                date={date}
                onDateChange={val => {
                  setDate(val);
                }}
              />
            </View>
            <SpaceComponents height={20} />
            <Button
              title="Comfirm"
              onPress={() => {
                onSelect(date);
                setIsVisibleModalDateTime(false);
              }}
            />
            <SpaceComponents height={10} />
            <Button
              title="Close"
              onPress={() => setIsVisibleModalDateTime(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponents;

const styles = StyleSheet.create({});
