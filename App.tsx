import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/homes/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import Routers from './src/routers/Routers';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="transparent"
      />
      <NavigationContainer>
        <Routers />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
