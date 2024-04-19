import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import RowComponents from '../components/RowComponents';
import SectionComponents from '../components/SectionComponents';
import TextComponents from '../components/TextComponents';
import {fontFamilies} from '../constants/fontFamilies';
import TitleComponents from '../components/TitleComponents';
import {globalStyles} from '../styles/globalStyles';
import CardComponents from '../components/CardComponents';
import {Element4, SearchNormal1} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TagComponents from '../components/TagComponents';
import SpaceComponents from '../components/SpaceComponents';

const HomeScreen = () => {
  return (
    <Container>
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
          <TextComponents color="#696B6F" text="Search" />
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
              <TextComponents text="Chart" />
            </View>
          </RowComponents>
        </CardComponents>
      </SectionComponents>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
