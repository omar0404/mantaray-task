import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  TextStyle,
  Linking,
  Platform,
} from 'react-native';
import {RootStackParamList} from '../navigation/home-navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {updateEvent as updateEventApi} from '../api/events';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../reducers/store';
import {updateEvent} from '../actions/events';
import moment from 'moment';
type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const DetailItem = ({
  imgSrc,
  label,
  labelStyle,
}: {
  imgSrc: ImageSourcePropType;
  label: string | number;
  labelStyle?: TextStyle;
}) => (
  <View style={style.col}>
    <Image style={style.icon} source={imgSrc} />
    <Text style={labelStyle}>{label}</Text>
  </View>
);

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
  const onLocationPress = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${event.location.latitude},${event.location.longitude}`;
    const label = 'locatin';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url as string);
  };
  return (
    <View>
      <View>
        <Image style={style.cover} source={{uri: event.img}} />
        <View style={style.row}>
          <DetailItem
            label={`$ ${event.price}`}
            imgSrc={require('../assets/tickets.png')}
          />
          <DetailItem
            label={moment(event.date).format('MMMM d, YYYY')}
            imgSrc={require('../assets/calendar.png')}
          />
        </View>
        <View style={style.row}>
          <DetailItem
            label={`${event.users.length}/${event.capacity}`}
            imgSrc={require('../assets/user.png')}
          />
          <TouchableOpacity style={style.location} onPress={onLocationPress}>
            <DetailItem
              label={event.location.street}
              labelStyle={style.hyperlink}
              imgSrc={require('../assets/location.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    marginTop: 40,
  },
  hyperlink: {
    textDecorationLine: 'underline',
  },
  registerText: {
    color: 'white',
  },
  cover: {
    width: '100%',
    height: 200,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  location: {flex: 1},
});

export default EventDetails;
