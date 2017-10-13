import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, saveDeckTitle, clearDecks } from '../utils/api';
import { getAllDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    // saveDeckTitle('Javascript').then((res) => {
    //   console.log(res)
      getDecks().then((results) => {
        if (results === null) {
          this.props.getAllDecks({});
        } else {
          this.props.getAllDecks(JSON.parse(results));
        }
      })
    // })
    // clearDecks()
  }
  render() {
    const { decks } = this.props;
    return (
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
                <View
                  key={deck.title} style={styles.deckInfo}
                >
                  <Text style={styles.titleText}>
                    {deck.title}
                  </Text>
                  <Text style={styles.cardCount}>
                    {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}
                  </Text>
                </View>
              ))
            )
          }
        </View>
    );
  }

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

function mapStateToProps(decks) {
  return {
    decks: Object.keys(decks).map((title) => (
      decks[title]
    ))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllDecks: (data) => dispatch(getAllDecks(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
