import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import user from './user';
const reducers = combineReducers({
  user: persistReducer(
    {
      key: 'root',
      version: 1,
      storage: AsyncStorage,
    },
    user,
  ),
});
export default reducers;
