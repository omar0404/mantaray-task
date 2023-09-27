import {
  configureStore,
  createListenerMiddleware,
  isRejected,
} from '@reduxjs/toolkit';
const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isRejected,
  effect: async action => {
    console.log('rejected', action);
    alert(action.error.message);
  },
});
import user from './user';
import posts from './posts';

const store = configureStore({
  reducer: {
    user,
    posts,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
