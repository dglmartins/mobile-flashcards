import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import reducer from './reducers';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';



function MobileFlashCardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  );
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#16aacb' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#16aacb',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home'
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#16aacb'
      },
      title: `${navigation.state.params.deck.title}`,
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#16aacb'
      },
      title: "Add Card",
    })
  }
})

class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MobileFlashCardStatusBar backgroundColor={'#006c84'} barStyle='light-content'/>
          <MainNavigator/>
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
