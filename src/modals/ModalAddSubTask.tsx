import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import RowComponents from '../components/RowComponents';
import TextComponents from '../components/TextComponents';
import ButtonComponent from '../components/ButtonComponents';
import {colors} from '../constants/colors';
import TitleComponents from '../components/TitleComponents';
import InputComponents from '../components/InputComponents';
import firestore from '@react-native-firebase/firestore';

interface Props {
  visible: boolean;
  subTask?: any;
  onClose: () => void;
  taskId: string;
}

const initValue = {
  title: '',
  description: '',
  isCompleted: false,
};

const ModalAddSubTask = (props: Props) => {
  const {visible, subTask, onClose, taskId} = props;
  const [subTaskForm, setSubTaskForm] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...subTaskForm};
    data[`${key}`] = value;

    setSubTaskForm(data);
  };

  const handleCloseModal = () => {
    setSubTaskForm(initValue);
    onClose();
  };

  const handleSaveToDatabase = async () => {
    setIsLoading(true);
    const data = {
      ...subTaskForm,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      taskId,
    };

    await firestore().collection('subTasks').add(data);
    setIsLoading(false);
    handleCloseModal();
  };

  return (
    <Modal
      visible={visible}
      style={globalStyles.modal}
      transparent
      animationType="slide">
      <View style={globalStyles.modalContainer}>
        <View
          style={[
            globalStyles.modalContent,
            {backgroundColor: colors.bgColor},
          ]}>
          <TitleComponents text="Add sub task" />
          <View style={{paddingVertical: 16}}>
            <InputComponents
              title="Title"
              placeholder="title"
              value={subTaskForm.title}
              onChange={val => handleChangeValue('title', val)}
            />
            <InputComponents
              title="Description"
              placeholder="Description"
              value={subTaskForm.description}
              onChange={val => handleChangeValue('description', val)}
              numberOfLine={3}
              multiple
            />
          </View>
          <RowComponents>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={handleCloseModal}>
                <TextComponents text="Close" flex={0} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <ButtonComponent
                isLoading={isLoading}
                text="Save"
                onPress={handleSaveToDatabase}
              />
            </View>
          </RowComponents>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddSubTask;

const styles = StyleSheet.create({});
