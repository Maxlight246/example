import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/Container';
import {globalStyles} from '../../styles/globalStyles';
import SectionComponents from '../../components/SectionComponents';
import TextComponents from '../../components/TextComponents';
import {
  AddSquare,
  ArrowLeft2,
  CalendarEdit,
  Clock,
  DocumentCloud,
  DocumentUpload,
  RowHorizontal,
  TickCircle,
} from 'iconsax-react-native';
import RowComponents from '../../components/RowComponents';
import {colors} from '../../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {Attachment, TaskModel} from '../../models/TaskModel';
import TitleComponents from '../../components/TitleComponents';
import SpaceComponents from '../../components/SpaceComponents';
import AvatarGroup from '../../components/AvatarGroup';
import {HandleDateTime} from '../../utils/handleDateTime';
import CardComponents from '../../components/CardComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fontFamilies} from '../../constants/fontFamilies';
import {Slider} from '@miblanchard/react-native-slider';
import ButtonComponent from '../../components/ButtonComponents';
import UploadFileComponents from '../../components/UploadFileComponents';
import {calcFileSize} from '../../utils/calcFileSize';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color}: {id: string; color?: string} = route.params;
  const [tasksDetail, setTasksDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    getDetailTask();

    return () => {
      getDetailTask();
    };
  }, []);

  useEffect(() => {
    if (tasksDetail) {
      setProgress(tasksDetail.progress ?? 0);
      setAttachments(tasksDetail.attachments ?? []);
    }
  }, [tasksDetail]);

  useEffect(() => {
    const tasksProgress = tasksDetail?.progress ?? 0;
    const tasksAttachments = tasksDetail?.attachments ?? [];
    if (
      Math.floor(progress * 100) !== Math.floor(tasksProgress * 100) ||
      attachments.length !== tasksAttachments.length
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [progress, attachments, subTasks]);

  const getDetailTask = () => {
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTasksDetail({
            id,
            ...snap.data(),
          });
        } else {
          console.log('Task Detail not found');
        }
      });
  };

  const handleUpdateTask = async () => {
    const data = {...tasksDetail, progress, attachments, updateAt: Date.now()};

    await firestore()
      .doc(`tasks/${id}`)
      .update(data)
      .then(() => {
        Alert.alert('updateTask successfully');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return tasksDetail ? (
    <>
      <StatusBar animated backgroundColor={color ?? 'rgba(113, 77, 217,0.8)'} />
      <ScrollView style={[globalStyles.container]}>
        <SectionComponents
          styles={{
            backgroundColor: color ?? 'rgba(113, 77, 217,0.8)',
            paddingVertical: Platform.OS === 'ios' ? 20 : 10,
            paddingTop: Platform.OS === 'ios' ? 48 : 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <RowComponents>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <ArrowLeft2 size={28} color={colors.white} />
              <SpaceComponents width={35} />
            </TouchableOpacity>
            <TitleComponents text={tasksDetail.title} flex={1} />
          </RowComponents>
          <SpaceComponents height={30} />
          <TextComponents text="Due date" />
          <RowComponents styles={{marginTop: 12}}>
            <RowComponents styles={{flex: 1}}>
              <Clock size={18} color={colors.white} />
              <SpaceComponents width={8} />
              <TextComponents
                text={`${HandleDateTime.GetHour(
                  tasksDetail.start?.toDate(),
                )} - ${HandleDateTime.GetHour(tasksDetail.end?.toDate())}`}
              />
            </RowComponents>
            <RowComponents styles={{flex: 1}}>
              <CalendarEdit size={18} color={colors.white} />
              <SpaceComponents width={8} />
              <TextComponents text="May -29" />
            </RowComponents>
            <RowComponents styles={{flex: 1}} justify="flex-end">
              <AvatarGroup uids={tasksDetail.uids} />
            </RowComponents>
          </RowComponents>
        </SectionComponents>

        <SectionComponents>
          <TitleComponents text="Description" />
          <CardComponents
            styles={{
              backgroundColor: colors.bgColor,
              borderWidth: 1,
              borderColor: colors.gray,
              borderRadius: 12,
              marginTop: 12,
            }}>
            <TextComponents text={tasksDetail.description} />
          </CardComponents>
        </SectionComponents>

        <SectionComponents>
          <RowComponents>
            <TitleComponents text="Files & Links" flex={1} />
            <UploadFileComponents
              onUpload={file => setAttachments([...attachments, file])}
            />
          </RowComponents>
          {attachments.map((item, index) => (
            <View key={`attachment${index}`}>
              <TextComponents text={item.name} flex={0} />
              <TextComponents text={calcFileSize(item.size)} flex={0} />
            </View>
          ))}
        </SectionComponents>

        <SectionComponents>
          <RowComponents>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: colors.success,
                marginRight: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: colors.success,
                  borderRadius: 100,
                }}
              />
            </View>
            <TextComponents
              text="Progress"
              flex={1}
              font={fontFamilies.medium}
              size={18}
            />
          </RowComponents>
          <SpaceComponents height={12} />
          <RowComponents>
            <View style={{flex: 1}}>
              <Slider
                value={progress}
                onValueChange={val => setProgress(val[0])}
                thumbTintColor={colors.success}
                thumbStyle={{
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
                maximumTrackTintColor={colors.gray2}
                minimumTrackTintColor={colors.success}
                trackStyle={{height: 10, borderRadius: 100}}
              />
            </View>
            <SpaceComponents width={20} />
            <TextComponents
              text={`${Math.floor(progress * 100)}%`}
              font={fontFamilies.bold}
              size={18}
              flex={0}
            />
          </RowComponents>
        </SectionComponents>

        <SectionComponents>
          <RowComponents>
            <TitleComponents text="Sub tasks" flex={1} />
            <TouchableOpacity>
              <AddSquare size={24} color={colors.success} variant="Bold" />
            </TouchableOpacity>
          </RowComponents>
          <SpaceComponents height={12} />
          {Array.from({length: 3}).map((item, index) => (
            <CardComponents
              key={`substask${index}`}
              styles={{marginBottom: 12}}>
              <RowComponents>
                <TickCircle variant="Bold" color={colors.success} size={22} />
                <SpaceComponents width={8} />
                <TextComponents text="lala" />
              </RowComponents>
            </CardComponents>
          ))}
        </SectionComponents>

        <SectionComponents>
          <ButtonComponent
            disable={!isChanged}
            text="update"
            onPress={handleUpdateTask}
          />
        </SectionComponents>
      </ScrollView>
    </>
  ) : (
    <></>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({});
