import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/homes/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './src/routers/Routers';
import {colors} from './src/constants/colors';

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bgColor} />
        <NavigationContainer>
          <Routers />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
