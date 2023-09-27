import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeNavigation, {RootStackParamList} from './home-navigation';
import Login from '../screens/login';
import Signup from '../screens/Signup';
import MyProfile from '../screens/my-profile';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../reducers/store';
import {createStackNavigator} from '@react-navigation/stack';
import {clearUser, getUser} from '../actions/user';
import MyProfileNavigation from './myprofile-navigation';
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
  const {user, isLoading} = useSelector<RootState, RootState['user']>(
    state => state.user,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser(user?.id as number));
  }, []);
  if (isLoading) {
    return null;
  }
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
      <Drawer.Screen name="Main" component={HomeNavigation} />
      {user && (
        <Drawer.Screen name="MyProfile" component={MyProfileNavigation} />
      )}
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
