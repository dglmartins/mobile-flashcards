import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';


const DeckList = (props) => {
  return (
      <View style={styles.container}>
        {props.state.map((deck) => (
          <View
            key={deck.title} style={styles.deckInfo}
          >
            <Text style={styles.titleText}>
              {deck.title}
            </Text>
            <Text style={styles.cardCount}>
              {deck.questions.length} cards
            </Text>
          </View>
        ))}
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
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
  }
});

function mapStateToProps(state) {
  return {
    state: Object.keys(state).map((title) => (
      state[title]
    ))
  };
}

export default connect(mapStateToProps)(DeckList);
