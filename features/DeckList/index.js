import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { getDecksAsyncStorage, clearDecksAsyncStorage, removeDeckAsyncStorage } from '../../utils/api';
import { getAllDecks, removeDeck, addDeck } from '../../actions';
import DeckItem from './DeckItem';
import { Alert } from 'react-native';

// Class component for using componentDidMount
class DeckList extends Component {

  //ComponentDidMount gets Decks from AsyncStorage then updates Redux if not empty
  componentDidMount() {
      getDecksAsyncStorage().then((results) => {
        if (results !== null) {
          this.props.getAllDecks(JSON.parse(results));
        }
      })
  }

  //onDeleteDeck alerts that a deck will be deleted, if confirmed, deletes from AsyncStorage then dispatches to Redux
  onDeleteDeck = (title) => {
    Alert.alert(
      'Confirm delete',
      'Are you sure you want to delete?!',
      [
        { text: 'Confirm', onPress: () => removeDeckAsyncStorage(title).then(() => {
          this.props.removeDeck(title)
        })},
        { text: 'Cancel', onPress: () => console.log('canceled')}
      ]
    )
  }

  //onNavigateToDeck renders DeckDetail route, which renders the DeckDetail component, passes the title of the deck to DeckDetail.
  onNavigateToDeck = (title)  => {
    this.props.navigation.dispatch(NavigationActions.navigate(
      {
        routeName: 'DeckDetail',
        params: {title}
      },
    ))
  }

  //Renders in a Scrollview, a title to add a Deck and each DeckItem to break down this component and make it more readable.
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
                  deck={deck}
                  onDeleteDeck={this.onDeleteDeck}
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
  noDeckContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  noDeckText: {
    fontSize: 20,
    fontWeight: 'bold'
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
