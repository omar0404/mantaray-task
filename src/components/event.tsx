import React from 'react';
import {Event as EventType} from '../types';
import {Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const Event = ({event}: {event: EventType}) => (
  <View style={style.card}>
    <Image style={style.image} source={{uri: event.img}} />
    <View style={style.content}>
      <View style={style.column}>
        <Text numberOfLines={1}>{event.title}</Text>
        <Text style={[style.subheading, style.topSpace]}>
          {event.location.street}
        </Text>
        <Text style={[style.subheading, style.topSpace]}>
          {moment(event.date).format('MMMM d, YYYY')}
        </Text>
        <Text style={[style.topSpace, style.price]}>${event.price}</Text>
      </View>
      <View style={[style.column, style.rightColumn]}>
        <Text>{`${event.users.length} / ${event.capacity}`}</Text>
      </View>
    </View>
  </View>
);
const style = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 50,
  },
  content: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  topSpace: {
    marginTop: 3,
  },
  price: {
    fontWeight: 'bold',
  },
  title: {fontWeight: 'bold', flex: 1},
  subheading: {color: 'gray'},
  body: {marginTop: 10},
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
});
export default Event;
