import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { getDecksAsyncStorage, clearDecksAsyncStorage, removeDeckAsyncStorage } from '../../utils/api';
import { getAllDecks, removeDeck, addDeck } from '../../actions';
import DeckItem from './DeckItem';
import { Alert } from 'react-native';

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
