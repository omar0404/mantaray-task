import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getEvents} from '../actions/events';
import {AppDispatch, RootState} from '../reducers/store';
import {RootStackParamList} from '../navigation/home-navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Event from '../components/event';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const events = useSelector<RootState, RootState['events']>(
    state => state.events,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  return (
    <View style={style.container}>
      <FlatList
        data={events.events}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EventDetails', {event: item})}
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
export default Home;
