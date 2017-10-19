import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MainButton from '../components/MainButton';

//Stateless functional component renders the title of the deck, the card count, a button to see the deck, a button to delete the deck. Uses MainButton component
const DeckItem = (props) => {
  const { deck, onDeleteDeck, onNavigateToDeck } = props;
  return (
    <View
      key={deck.title} style={styles.deckInfo}
    >
      <Text style={styles.titleText}>
        {deck.title}
      </Text>
      <Text style={styles.cardCount}>
        {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}
      </Text>
      <View style={styles.buttonContainer}>
        <MainButton
          handlePress={() => onNavigateToDeck(deck.title)}
          buttonText="See Deck"
        />
        <MainButton
          handlePress={() => onDeleteDeck(deck.title)}
          buttonText="Delete Deck"
          extraStyle={{backgroundColor: "#ea7a87"}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deckInfo: {
    height: 125,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center'

  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardCount: {
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
    paddingTop: 5
  },
  noDeckContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  noDeckText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection:'row',
    justifyContent: 'space-around'
  }
});

export default DeckItem;
