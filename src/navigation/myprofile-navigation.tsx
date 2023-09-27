import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EventDetails from '../screens/event-details';
import {Event} from '../types';
import MyProfile from '../screens/my-profile';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase} from '@react-navigation/native';
export type RootStackParamList = {
  MyProfile: undefined;
  EventDetails: {event: Event};
};
const Stack = createStackNavigator<RootStackParamList>();

function MyProfileNavigation({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) {
  return (
    <Stack.Navigator
      screenListeners={({route}) => {
        if (route.name === 'MyProfile') {
          navigation.setOptions({headerShown: true});
        } else {
          navigation.setOptions({headerShown: false});
        }
        return {};
      }}
      initialRouteName="MyProfile">
      <Stack.Screen
        options={{headerShown: false}}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
}
export default MyProfileNavigation;
