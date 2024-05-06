import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import {TaskModel} from '../../models/TaskModel';
import SectionComponents from '../../components/SectionComponents';
import InputComponents from '../../components/InputComponents';
import {AttachSquare, User} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import DateTimePickerComponents from '../../components/DateTimePickerComponents';
import RowComponents from '../../components/RowComponents';
import SpaceComponents from '../../components/SpaceComponents';
import DropdownPicker from '../../components/DropdownPicker';
import firestore from '@react-native-firebase/firestore';
import {SelectModel} from '../../models/SelectModel';
import ButtonComponent from '../../components/ButtonComponents';
import TitleComponents from '../../components/TitleComponents';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import TextComponents from '../../components/TextComponents';
import storage from '@react-native-firebase/storage';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
  id: '',
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);
  const [attachmentUrl, setAttachmentUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    handleGetAllUser();
  }, []);

  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    const item: any = {...taskDetail};
    item[`${id}`] = value;
    setTaskDetail(item);
  };

  const handleGetAllUser = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log('NOthing');
        } else {
          const items: SelectModel[] = [];
          snap.forEach(item => {
            items.push({
              label: item.data().name,
              value: item.id,
            });
          });
          setUsersSelect(items);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUploadFileToStorage = async (item: DocumentPickerResponse) => {
    setIsUploading(true);
    const fileName = item.name ?? `file${Date.now()}`;
    const path = `documents/${fileName}`;
    const items = [...attachmentUrl];
    await storage()
      .ref(path)
      .putFile(item.fileCopyUri ?? '');

    await storage()
      .ref(path)
      .getDownloadURL()
      .then(downloadURL => {
        items.push(downloadURL);
        setAttachmentUrl(items);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const handleAddNewTasks = async () => {
    setIsLoading(true);
    const data = {
      ...taskDetail,
      fileUrls: attachmentUrl,
    };

    await firestore()
      .collection('tasks')
      .add(data)
      .then(() => {
        console.log('New tasks added');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDocumentPicker = () => {
    DocumentPicker.pick({copyTo: 'cachesDirectory'})
      .then(res => {
        setAttachments(res);

        res.forEach(res => handleUploadFileToStorage(res));
      })
      .catch(err => {
        console.log(err);
      });
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
        <DropdownPicker
          selected={taskDetail.uids}
          items={usersSelect}
          onSelect={val => handleChangeValue('uids', val)}
          title="Members"
          multiple
        />
        <View>
          <RowComponents justify="flex-start" onPress={handleDocumentPicker}>
            <TitleComponents text="Attachments" flex={0} />
            <SpaceComponents width={8} />
            <AttachSquare size={20} color={colors.white} />
          </RowComponents>
          {isUploading && <ActivityIndicator />}
          {attachments.length > 0 &&
            !isUploading &&
            attachments.map((item, index) => (
              <RowComponents key={`attachment${index}`}>
                <TextComponents text={item.name ?? ''} />
              </RowComponents>
            ))}
        </View>
      </SectionComponents>
      <SectionComponents>
        <ButtonComponent
          isLoading={isLoading}
          text="Save"
          onPress={handleAddNewTasks}
        />
      </SectionComponents>
    </Container>
  );
};

export default AddNewTask;

const styles = StyleSheet.create({});
