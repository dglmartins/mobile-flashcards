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
import MainButton from './components/MainButton';
import InputField from './components/InputField';

// Class component for managing state of its own decktTitle field. 
class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  //checks if the field is not empty, checks if the title already exists, if not saves to AsyncStorage, dispatches to Redux, navigates to Decks, clears deckTitle state.
  onAddDeck = () => {
    const { deckTitle } = this.state;
    if (deckTitle === '') {
      alert('Please insert a title');
      return;
    }
    if (this.props.decks[deckTitle]) {
      alert('Deck already exists! Please try a different name or edit/delete the existing deck');
      this.setState({deckTitle: ''})
      return;
    }
    saveDeckAsyncStorage(deckTitle).then(() => {
      this.props.addDeck(deckTitle);
      this.props.navigation.dispatch(NavigationActions.navigate({
        routeName: 'Decks'
      }))
      this.setState({deckTitle: ''})
    });
  }

  //handes change of deckTitle input
  changeTitleInput = (deckTitle) => {
    this.setState({ deckTitle });
  }

  //renders an instruction to input title, an input field and a button to submit.
  render () {
    return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Input Deck Title</Text>
          </View>
          <InputField
            inputValue={this.state.deckTitle}
            handleTextChange={this.changeTitleInput}
            placeholder='Deck Title'
          />
          <View style={styles.buttonContainer}>
            <MainButton
              handlePress={this.onAddDeck}
              buttonText="Submit"
            />
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
  buttonContainer: {
    marginTop: 30,
  }
});

function mapStateToProps({ decks }) {
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
