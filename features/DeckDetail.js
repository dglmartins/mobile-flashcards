import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MainButton from './components/MainButton';


const DeckDetail = (props) => {
  const onNavigateToAddCard = (title)  => {
    props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'AddCard',
        params: {title}
      },
    ))
  }

  const onNavigateToQuiz = (title)  => {
    if (props.deck.questions.length === 0) {
      alert("Add at least one card to take Quiz")
      return
    }
    props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'Quiz',
        params: {title}
      },
    ))
  }
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
              buttonText="Add Card"
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

function mapStateToProps({ decks }, { navigation }) {
  return {
    deck: Object.keys(decks).map((title) => (
      decks[title]
    )).filter((deck) => (deck.title === navigation.state.params.title))[0]
  };
}

export default connect(mapStateToProps)(DeckDetail);
