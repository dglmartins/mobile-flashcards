import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../actions';
import { saveDeckAsyncStorage } from '../utils/api';


class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  onAddDeck = () => {
    const { deckTitle } = this.state;
    if (deckTitle === '') {
      alert('Please insert a title');
      return;
    }
    if (this.props.decks[deckTitle]) {
      alert('Deck already exists! Please try a different name or edit/delete the existing deck');
      return;
    }
    saveDeckAsyncStorage(deckTitle).then(() => {
      this.props.addDeck(deckTitle);
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Decks'
      }))
    });
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
            <TouchableOpacity style={styles.button} onPress={this.onAddDeck}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
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

function mapStateToProps(decks) {
  return {
    decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: (data) => dispatch(addDeck(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
