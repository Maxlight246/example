import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import {TaskModel} from '../../models/TaskModel';
import SectionComponents from '../../components/SectionComponents';
import InputComponents from '../../components/InputComponents';
import {User} from 'iconsax-react-native';
import {colors} from '../../constants/colors';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: '',
  start: '',
  end: '',
  uids: [],
  fileUrls: [],
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);

  const handleChangeValue = (id: string, value: string) => {
    const item: any = {...taskDetail};
    item[`${id}`] = value;
    setTaskDetail(item);
  };
  return (
    <Container back title="Add New Task">
      <SectionComponents>
        <InputComponents
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponents
          value={taskDetail.description}
          onChange={val => handleChangeValue('description', val)}
          title="Description"
          allowClear
          placeholder="Content"
          multiple
          numberOfLine={5}
        />
      </SectionComponents>
    </Container>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({});
