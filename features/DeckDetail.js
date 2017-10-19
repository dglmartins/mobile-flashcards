import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MainButton from './components/MainButton';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers';


//Stateless functional component, called via route by a button on DeckList.
const DeckDetail = (props) => {

  //Navigates to AddCard, passing title as a param
  const onNavigateToAddCard = (title)  => {
    props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'AddCard',
        params: {title}
      },
    ))
  }

  //Does a check to see if there is at least one card, or else, no Quiz. Else navigates to Quiz, clears notifications and sets notifications for tomorrow. Passes to Quiz title as a param.
  const onNavigateToQuiz = (title)  => {
    if (props.deck.questions.length === 0) {
      alert("Add at least one card to take Quiz");
      return;
    }

    clearLocalNotification().then(setLocalNotification());
    props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'Quiz',
        params: {title}
      },
    ));
  }

  //renders the title of the deck, its current card count, a button to navigate to AddCard, a button to navigate to Quiz.
  return (
    <View style={styles.container}>
      {props.deck && (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {props.deck.title}
            </Text>
          </View>
          <Text style={styles.cardCount}>
            {props.deck.questions.length} {props.deck.questions.length === 1 ? 'card' : 'cards'}
          </Text>
          <View style={styles.buttonContainer}>
            <MainButton
              handlePress={() => onNavigateToAddCard(props.deck.title)}
              extraStyle={{backgroundColor: '#006c84'}}
              buttonText="Add Question"
            />
            <MainButton
              handlePress={() => onNavigateToQuiz(props.deck.title)}
              buttonText="Start Quiz"
            />
          </View>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    height: 50,

  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  cardCount: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center'
  }
});

//With the title received as navigation param and redux decks, maps the deck to prop
function mapStateToProps({ decks }, { navigation }) {
  return {
    deck: Object.keys(decks).map((title) => (
      decks[title]
    )).filter((deck) => (deck.title === navigation.state.params.title))[0]
  };
}

export default connect(mapStateToProps)(DeckDetail);
