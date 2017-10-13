import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  render () {
    return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>What is the title of your new deck?</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.deckTitle}
              onChangeText={(deckTitle) => this.setState({deckTitle})}
              placeholder='Deck Title'
              underlineColorAndroid='#dedede'
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          {/* {props.state.map((deck) => (
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
          ))} */}
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
    paddingTop: 100
  },
  titleContainer: {
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25
  },
  titleText: {
    fontSize: 35,
    textAlign: 'center'
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
    backgroundColor: '#fff',
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
    shadowOpacity: 1,
    paddingBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 1,
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Platform.OS === 'ios' ? '#dedede' : 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#16aacb',
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

// function mapStateToProps(state) {
//   return {
//     state: Object.keys(state).map((title) => (
//       state[title]
//     ))
//   };
// }

export default connect()(AddDeck);
