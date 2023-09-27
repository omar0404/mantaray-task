import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import type {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
import EventDetails from '../screens/event-details';
import {Event} from '../types';
export type RootStackParamList = {
  Home: undefined;
  EventDetails: {event: Event};
  CreatePost: undefined;
  Login: undefined;
  Signup: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function HomeNavigation({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) {
  return (
    <Stack.Navigator
      screenListeners={({route}) => {
        if (route.name === 'Home') {
          navigation.setOptions({headerShown: true});
        } else {
          navigation.setOptions({headerShown: false});
        }
        return {};
      }}
      initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
}
export default HomeNavigation;
