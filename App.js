import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';

function MobileFlashCardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  );
}

class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MobileFlashCardStatusBar backgroundColor={'white'} barStyle='dark-content'/>
          <DeckList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App
