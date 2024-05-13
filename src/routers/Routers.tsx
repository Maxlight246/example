import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/homes/HomeScreen';
import AddNewTask from '../screens/tasks/AddNewTask';
import SearchScreen from '../screens/SearchScreen';
import auth from '@react-native-firebase/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import SignInScreen from '../screens/auth/SigninScreen';
import TaskDetail from '../screens/tasks/TaskDetail';

const Routers = () => {
  const [isLogin, setIsLogin] = useState(false);
  const Stack = createStackNavigator();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
    </Stack.Navigator>
  );

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SigninScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
  return isLogin ? MainRouter : AuthRouter;
};

export default Routers;

const styles = StyleSheet.create({});
