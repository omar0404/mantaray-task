import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Event from '../components/event';
import {RootStackParamList} from '../navigation/home-navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {updateEvent as updateEventApi} from '../api/events';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../reducers/store';
import {updateEvent} from '../actions/events';
type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const EventDetails = ({route, navigation}: Props) => {
  const [event, setEvent] = useState(route.params.event);
  const {user} = useSelector<RootState, RootState['user']>(state => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const isRegisterDisabled =
    event.users.includes(user?.id as number) ||
    event.capacity === event.users.length;
  useEffect(() => {
    navigation.setOptions({title: event.title});
  }, []);
  const onRegister = async () => {
    const updatedUsers = [...event.users, user?.id as number];
    const updatedEvent = await updateEventApi(event.id, updatedUsers);
    setEvent(updatedEvent);
    dispatch(updateEvent(event.id, {...event, users: updatedUsers}));
  };
  return (
    <View>
      <Event event={event} />
      <TouchableOpacity
        onPress={onRegister}
        disabled={isRegisterDisabled}
        style={[style.registerBtn, isRegisterDisabled ? style.disabled : {}]}>
        <Text style={style.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  registerBtn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
    height: 40,
    borderRadius: 5,
  },
  registerText: {
    color: 'white',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default EventDetails;
