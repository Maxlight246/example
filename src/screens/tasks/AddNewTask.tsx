import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import {TaskModel} from '../../models/TaskModel';
import SectionComponents from '../../components/SectionComponents';
import InputComponents from '../../components/InputComponents';
import {User} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import DateTimePickerComponents from '../../components/DateTimePickerComponents';
import RowComponents from '../../components/RowComponents';
import SpaceComponents from '../../components/SpaceComponents';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);

  const handleChangeValue = (id: string, value: string | Date) => {
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
        <DateTimePickerComponents
          selected={taskDetail.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
          title="Due Date"
          type="date"
          placeholder="Choice of date"
        />

        <RowComponents>
          <View style={{flex: 1}}>
            <DateTimePickerComponents
              selected={taskDetail.start}
              onSelect={val => handleChangeValue('start', val)}
              title="Start"
              type="time"
            />
          </View>
          <SpaceComponents width={14} />
          <View style={{flex: 1}}>
            <DateTimePickerComponents
              selected={taskDetail.end}
              onSelect={val => handleChangeValue('end', val)}
              title="End"
              type="time"
            />
          </View>
        </RowComponents>
      </SectionComponents>
    </Container>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({});
