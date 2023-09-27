/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/reducers/store';
import Navigation from './src/navigation';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
