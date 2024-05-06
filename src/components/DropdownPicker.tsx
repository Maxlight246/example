import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SelectModel} from '../models/SelectModel';
import TitleComponents from './TitleComponents';
import RowComponents from './RowComponents';
import {globalStyles} from '../styles/globalStyles';
import TextComponents from './TextComponents';
import {colors} from '../constants/colors';
import {ArrowDown2, SearchNormal1, TickCircle} from 'iconsax-react-native';
import ButtonComponent from './ButtonComponents';
import InputComponents from './InputComponents';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponents from './SpaceComponents';

interface Props {
  title?: string;
  items: SelectModel[];
  selected?: string[];
  onSelect: (val: string[]) => void;
  multiple?: boolean;
}

const DropdownPicker = (props: Props) => {
  const {selected, title, items, onSelect, multiple} = props;
  const [isVisiable, setIsVisiable] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<SelectModel[]>([]);
  const [dataSelected, setDataSelected] = useState<string[]>([]);

  useEffect(() => {
    selected && setDataSelected(selected);
  }, [isVisiable, selected]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      const data = items.filter(element => {
        return element.label.toLowerCase().includes(searchKey.toLowerCase());
      });

      setResults(data);
    }
  }, [searchKey]);

  const handleSelectedItem = (id: string) => {
    if (multiple) {
      const data = [...dataSelected];
      const index = data.findIndex(item => item === id);
      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }
      setDataSelected(data);
    } else {
      setDataSelected([id]);
    }
  };

  const handleComfirmSelect = () => {
    onSelect(dataSelected);
    setIsVisiable(false);
    setDataSelected([]);
  };

  const handleRemoveItemSelected = (index: number) => {
    if (selected) {
      selected.splice(index, 1);
      onSelect(selected);
    }
  };

  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find(item => item.value === id);
    return (
      item && (
        <RowComponents
          onPress={() => handleRemoveItemSelected(index)}
          key={id}
          styles={{
            marginRight: 4,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 100,
            borderWidth: 0.5,
            borderColor: colors.gray2,
            marginBottom: 8,
          }}>
          <TextComponents text={item.label} flex={0} />
          <SpaceComponents width={8} />
          <AntDesign name="close" size={14} color={colors.white} />
        </RowComponents>
      )
    );
  };

  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponents text={title} />}
        <RowComponents
          onPress={() => setIsVisiable(true)}
          styles={[globalStyles.inputContainer, {marginTop: title ? 8 : 0}]}>
          <View style={{flex: 1, paddingRight: 12}}>
            {selected && selected.length > 0 ? (
              <RowComponents
                styles={{justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                {selected.map((id, index) => renderSelectedItem(id, index))}
              </RowComponents>
            ) : (
              <TextComponents text="Select" color={colors.gray2} flex={0} />
            )}
          </View>
          <ArrowDown2 size={20} color={colors.white} />
        </RowComponents>
      </View>

      <Modal
        visible={isVisiable}
        style={{flex: 1}}
        transparent
        animationType="slide"
        statusBarTranslucent>
        <View
          style={[globalStyles.container, {padding: 20, paddingVertical: 60}]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <RowComponents>
                <View style={{flex: 1, marginRight: 12}}>
                  <InputComponents
                    value={searchKey}
                    onChange={val => setSearchKey(val)}
                    placeholder="Search..."
                    prefix={<SearchNormal1 size={20} color={colors.gray2} />}
                    allowClear
                  />
                </View>
                <TouchableOpacity onPress={() => setIsVisiable(false)}>
                  <TextComponents text="Cancel" color="coral" flex={0} />
                </TouchableOpacity>
              </RowComponents>
            }
            data={searchKey ? results : items}
            style={{flex: 1}}
            renderItem={({item}) => (
              <RowComponents
                onPress={() => handleSelectedItem(item.value)}
                key={item.value}
                styles={{paddingVertical: 16}}>
                <TextComponents
                  text={item.label}
                  color={
                    dataSelected.includes(item.value) ? 'coral' : colors.text
                  }
                />
                {dataSelected.includes(item.value) && (
                  <TickCircle size={22} color="coral" />
                )}
              </RowComponents>
            )}
          />
          <ButtonComponent text="Comfirm" onPress={handleComfirmSelect} />
        </View>
      </Modal>
    </>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({});
