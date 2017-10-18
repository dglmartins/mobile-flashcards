import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { getDecksAsyncStorage, clearDecksAsyncStorage, removeDeckAsyncStorage } from '../utils/api';
import { getAllDecks, removeDeck, addDeck } from '../actions';
import DeckItem from './DeckItem';

class DeckList extends Component {
  componentDidMount() {
      getDecksAsyncStorage().then((results) => {
        if (results === null) {
          this.props.getAllDecks({});
        } else {
          this.props.getAllDecks(JSON.parse(results));
        }
      })
  }

  onDeleteDeck = (title) => {
    removeDeckAsyncStorage(title).then(() => {
      this.props.removeDeck(title)
    });
  }

  onNavigateToDeck = (title)  => {
    this.props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'DeckDetail',
        params: {title}
      },
    ))
  }

  render() {
    const { decks } = this.props;
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {decks.length === 0
            ? (
              <View style={styles.noDeckContainer}>
                <Text style={styles.noDeckText}>
                  Please add a deck
                </Text>
              </View>
              )
            : (
              decks.map((deck) => (
                <DeckItem
                  deck={deck} onDeleteDeck={this.onDeleteDeck}
                  key={deck.title}
                  onNavigateToDeck={this.onNavigateToDeck}
                />
              ))
            )
          }
        </View>
      </ScrollView>

    );
  }

};


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
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

function mapStateToProps({decks}) {
  return {
    decks: Object.keys(decks).map((title) => (
      decks[title]
    ))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllDecks: (data) => dispatch(getAllDecks(data)),
    removeDeck: (data) => dispatch(removeDeck(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
