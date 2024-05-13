import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/homes/HomeScreen';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import Routers from './src/routers/Routers';
import {colors} from './src/constants/colors';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgColor} />
      <NavigationContainer theme={DarkTheme}>
        <Routers />
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
