import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { setLocalNotification } from './utils/helpers';
import reducer from './reducers';
import DeckList from './features/DeckList';
import AddDeck from './features/AddDeck';
import DeckDetail from './features/DeckDetail';
import AddCard from './features/AddCard';
import Quiz from './features/Quiz';

//Status Bar component using Constants.statusBarHeight
const MobileFlashCardStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  );
}

//Tab Navigator will navigate between viewing Decks and Adding a new Deck
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
  //Different styles for Android or IOS
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

//Main navigator a stack navigator of which Home is the TabNavigator above
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
      headerBackTitle: 'Back',
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#16aacb',
      },
      headerBackTitle: 'Back',
      title: `${navigation.state.params.title}`,
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#16aacb'
      },
      headerBackTitle: 'Back',
      title: "Add Card",
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#16aacb'
      },
      headerBackTitle: 'Back',
      title: "Quiz",
    }
  }
})

//App renders Status Bar and MainNavigator, making the first page of the app DeckList
class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

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

export default App;
