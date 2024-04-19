import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/homes/HomeScreen';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="transparent"
      />
      <HomeScreen />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
