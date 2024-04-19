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

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponents>
        <RowComponents justify="space-between">
          <TextComponents text="hihi" />
          <TextComponents text="hihi" />
        </RowComponents>
      </SectionComponents>
      <SectionComponents>
        <TextComponents text="Hi, Jason" />
        <TitleComponents text="Be Productive Today" />
      </SectionComponents>
      <SectionComponents>
        <RowComponents styles={[globalStyles.inputContainer]}>
          <TextComponents text="Search" />
          <Text>ss</Text>
        </RowComponents>
      </SectionComponents>
      <SectionComponents>
        <CardComponents>
          <RowComponents>
            <View style={{flex: 1}}>
              <TitleComponents text="Task progress" />
              <TextComponents text="30/40 task done" />
              <TextComponents text="tag" />
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
