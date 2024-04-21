import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import RowComponents from '../components/RowComponents';
import SectionComponents from '../components/SectionComponents';
import TextComponents from '../components/TextComponents';
import {fontFamilies} from '../constants/fontFamilies';
import TitleComponents from '../components/TitleComponents';
import {globalStyles} from '../styles/globalStyles';
import CardComponents from '../components/CardComponents';
import {Add, Edit2, Element4, SearchNormal1} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TagComponents from '../components/TagComponents';
import SpaceComponents from '../components/SpaceComponents';
import CircularComponents from '../components/CircularComponents';
import CardImageComponents from '../components/CardImageComponents';
import AvatarGroup from '../components/AvatarGroup';
import ProgressBarComponents from '../components/ProgressBarComponents';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Container>
        <SpaceComponents height={Platform.OS === 'ios' ? 52 : 42} />
        <SectionComponents>
          <RowComponents justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Ionicons name="notifications" size={24} color={colors.desc} />
          </RowComponents>
        </SectionComponents>
        <SectionComponents>
          <TextComponents text="Hi, Jason" />
          <TitleComponents text="Be Productive Today" />
        </SectionComponents>
        <SectionComponents>
          <RowComponents styles={[globalStyles.inputContainer]}>
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
        <SectionComponents>
          <RowComponents styles={{alignItems: 'flex-start'}}>
            <View style={{flex: 1}}>
              <CardImageComponents>
                <TouchableOpacity style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponents text="UX Design" />
                <TextComponents text="Task manager mobile app" size={13} />

                <View style={{marginVertical: 24}}>
                  <AvatarGroup />
                  <ProgressBarComponents percent="70%" color="#0AACFF" />
                </View>
                <TextComponents
                  text="Due, 2023 March 03"
                  size={12}
                  color={colors.desc}
                />
              </CardImageComponents>
            </View>
            <SpaceComponents width={16} />
            <View style={{flex: 1}}>
              <CardImageComponents color="rgba(33,150,243,0.8)">
                <TouchableOpacity style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponents text="API Payment" />
                <AvatarGroup />
                <ProgressBarComponents percent="40%" color="#A2F068" />
              </CardImageComponents>
              <SpaceComponents height={16} />
              <CardImageComponents color="rgba(18,181,22,0.8)">
                <TouchableOpacity style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponents text="Update Work" />
                <TextComponents text="Revison home page" size={13} />
              </CardImageComponents>
            </View>
          </RowComponents>
        </SectionComponents>
        <SectionComponents>
          <TitleComponents text="Urgents tasks" />
          <CardComponents>
            <RowComponents>
              <CircularComponents value={80} radius={40} />
              <View
                style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                <TextComponents text="Title of task" />
              </View>
            </RowComponents>
          </CardComponents>
        </SectionComponents>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              globalStyles.row,
              {
                backgroundColor: colors.bgColor,
                padding: 10,
                borderRadius: 100,
                width: '80%',
              },
            ]}>
            <TextComponents text="Add new tasks" flex={0} />
            <Add size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
