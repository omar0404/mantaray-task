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
import store from './src/reducers/store';
import Navigation from './src/navigation';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
