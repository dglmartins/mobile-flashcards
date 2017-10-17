import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';


const DeckDetail = (props) => {
  const onNavigateToAddCard = (title)  => {
    props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'AddCard',
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
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#006c84'}]}
              onPress={() => onNavigateToAddCard(props.deck.title)}
            >
              <Text style={styles.buttonText}>
                Add Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#16aacb'}]}
            >
              <Text style={styles.buttonText}>
                Start Quiz
              </Text>
            </TouchableOpacity>
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
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
    // alignSelf: 'stretch',
    // marginLeft: 20,
    // marginRight: 20,
    // justifyContent: 'center'

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
  },
  button: {
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 2,
    height: 30,
    width: 100,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
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
