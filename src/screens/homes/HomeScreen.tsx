import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import RowComponents from '../../components/RowComponents';
import SectionComponents from '../../components/SectionComponents';
import TextComponents from '../../components/TextComponents';
import {fontFamilies} from '../../constants/fontFamilies';
import TitleComponents from '../../components/TitleComponents';
import {globalStyles} from '../../styles/globalStyles';
import CardComponents from '../../components/CardComponents';
import {
  Add,
  Edit2,
  Element4,
  Logout,
  SearchNormal1,
} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TagComponents from '../../components/TagComponents';
import SpaceComponents from '../../components/SpaceComponents';
import CircularComponents from '../../components/CircularComponents';
import CardImageComponents from '../../components/CardImageComponents';
import AvatarGroup from '../../components/AvatarGroup';
import ProgressBarComponents from '../../components/ProgressBarComponents';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {TaskModel} from '../../models/TaskModel';
import ButtonComponent from '../../components/ButtonComponents';

const HomeScreen = ({navigation}: any) => {
  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    getNewTasks();
    return () => {
      getNewTasks();
    };
  }, []);

  const getNewTasks = async () => {
    setIsLoading(true);

    await firestore()
      .collection('tasks')
      .limit(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('Task is empty');
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );

          setTasks(items);
          setIsLoading(false);
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        {/* <SpaceComponents height={Platform.OS === 'ios' ? 32 : 22} /> */}
        <SectionComponents>
          <RowComponents justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Ionicons name="notifications" size={24} color={colors.desc} />
          </RowComponents>
        </SectionComponents>
        <SectionComponents>
          <RowComponents>
            <View style={{flex: 1}}>
              <TextComponents text={`hi ${user?.email}`} />
              <TitleComponents text="Be Productive Today" />
            </View>
            <TouchableOpacity onPress={() => auth().signOut()}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponents>
        </SectionComponents>
        <SectionComponents>
          <RowComponents
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate('SearchScreen')}>
            <TextComponents color={colors.gray2} text="Search" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponents>
        </SectionComponents>
        <SectionComponents>
          <CardComponents>
            <RowComponents>
              <View style={{flex: 1}}>
                <TitleComponents text="Task progress" />
                <TextComponents text="30/40 task done" />
                <SpaceComponents height={12} />
                <RowComponents justify="flex-start">
                  <TagComponents text="March 23" />
                </RowComponents>
              </View>
              <View>
                <CircularComponents value={80} />
              </View>
            </RowComponents>
          </CardComponents>
        </SectionComponents>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponents>
            <RowComponents styles={{alignItems: 'flex-start'}}>
              <View style={{flex: 1}}>
                {tasks[0] && (
                  <CardImageComponents>
                    <TouchableOpacity style={[globalStyles.iconContainer]}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponents text={tasks[0].title} />
                    <TextComponents text={tasks[0].description} size={13} />

                    <View style={{marginVertical: 24}}>
                      {tasks[0].uids && <AvatarGroup uids={tasks[0].uids} />}

                      {tasks[0].progress && (
                        <ProgressBarComponents percent="70%" color="#0AACFF" />
                      )}
                    </View>
                    <TextComponents
                      text={`Due, ${tasks[0].dueDate.toDate()}`}
                      size={12}
                      color={colors.desc}
                    />
                  </CardImageComponents>
                )}
              </View>
              <SpaceComponents width={16} />
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <CardImageComponents color="rgba(33,150,243,0.8)">
                    <TouchableOpacity style={[globalStyles.iconContainer]}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponents text={tasks[1].title} />
                    {tasks[1].uids && <AvatarGroup uids={tasks[1].uids} />}
                    {tasks[1].progress && (
                      <ProgressBarComponents percent="40%" color="#A2F068" />
                    )}
                  </CardImageComponents>
                )}
                <SpaceComponents height={16} />
                {tasks[2] && (
                  <CardImageComponents color="rgba(18,181,22,0.8)">
                    <TouchableOpacity style={[globalStyles.iconContainer]}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponents text={tasks[2].title} />
                    <TextComponents text={tasks[2].description} size={13} />
                  </CardImageComponents>
                )}
              </View>
            </RowComponents>
          </SectionComponents>
        ) : (
          <></>
        )}

        <SectionComponents>
          <TitleComponents text="Urgents tasks" />
          <CardComponents>
            <RowComponents>
              <CircularComponents value={80} radius={30} titleFontSize={13} />
              <View
                style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                <TextComponents text="Title of task" />
              </View>
            </RowComponents>
          </CardComponents>
        </SectionComponents>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          paddingBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewTask')}
          activeOpacity={0.7}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 100,
              width: '80%',
            },
          ]}>
          <TextComponents text="Add new tasks" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
