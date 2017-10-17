import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#16aacb'}]}
          onPress={() => onNavigateToDeck(deck.title)}
        >
          <Text style={styles.buttonText}>
            See Deck
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={() => onDeleteDeck(deck.title)}
        >
          <Text style={styles.buttonText}>
            Delete Deck
          </Text>
        </TouchableOpacity>
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
  },
  button: {
    justifyContent: 'center',
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

export default DeckItem;
