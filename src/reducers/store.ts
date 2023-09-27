import {
  configureStore,
  createListenerMiddleware,
  isRejected,
} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isRejected,
  effect: async action => {
    Toast.show({type: 'error', text1: action.error.message});
  },
});

import Toast from 'react-native-toast-message';
import reducers from '.';

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
