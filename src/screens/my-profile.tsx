import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/store';
import {RootStackParamList} from '../navigation/home-navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Event from '../components/event';
import {events} from '../api';
import {Event as EventType} from '../types';
import {useFocusEffect} from '@react-navigation/native';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MyProfile = ({navigation}: Props) => {
  const [data, setData] = useState<EventType[]>([]);
  const {user} = useSelector<RootState, RootState['user']>(state => state.user);
  const getEvents = async () => {
    const res = await events.getUserEvents(user?.id as number);
    setData(res);
  };
  useFocusEffect(() => {
    getEvents();
  });

  return (
    <View style={style.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            // onPress={() => navigation.navigate('Event', {event: item})}
            key={item.id}>
            <Event event={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default MyProfile;
