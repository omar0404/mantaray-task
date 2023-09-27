import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeNavigation, {RootStackParamList} from './home-navigation';
import AddPostButton from '../components/add-post-button';
import Login from '../screens/login';
import Signup from '../screens/Signup';
import MyProfile from '../screens/my-profile';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../reducers/store';
import {createStackNavigator} from '@react-navigation/stack';
import {clearUser} from '../actions/user';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const DrawerItems = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={style.container}>
      <View style={style.wrapper}>
        <DrawerItem
          label={'Home'}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label={'MyProfile'}
          onPress={() => props.navigation.navigate('MyProfile')}
        />
      </View>
      <DrawerItem
        labelStyle={style.logoutLabel}
        label={'Logout'}
        onPress={() => dispatch(clearUser())}
      />
    </View>
  );
};

function MyDrawer() {
  const {user} = useSelector<RootState, RootState['user']>(state => state.user);
  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }
  return (
    <Drawer.Navigator drawerContent={DrawerItems}>
      <Drawer.Screen
        options={{
          headerRight: AddPostButton,
        }}
        name="Home"
        component={HomeNavigation}
      />
      {user && <Drawer.Screen name="MyProfile" component={MyProfile} />}
    </Drawer.Navigator>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  logoutLabel: {
    color: 'red',
  },
});

export default MyDrawer;
