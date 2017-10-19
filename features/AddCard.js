import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { addCardAsyncStorage } from '../utils/api';
import MainButton from './components/MainButton';
import InputField from './components/InputField';

//Class component for managing state of question and answer inputs. 
class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  //checks if either field is empty, if saves card on AsyncStorage then dispatches to redux, goes back in navigation, and clears the state of inputs.
  onAddCard = () => {
    const { question, answer } = this.state;
    if (question === '' || answer === '') {
      alert('Please insert both a question and answer');
      return;
    }
    const card = { question, answer };
    const { title } = this.props.navigation.state.params
    addCardAsyncStorage(title, card).then(() => {
      this.props.addCard({title, card});
      this.props.navigation.goBack();
      this.setState({question: '', answer: ''})
    });
  }

  //handles onChangeText of question field
  changeQuestionInput = (question) => {
    this.setState({ question })
  }

  //handles onChangeText of answer field
  changeAnswerInput = (answer) => {
    this.setState({ answer })
  }

  //renders an instruction to add question and answer, two input fields for question and answer and a submit button.
  render () {
    return (
        <View style={styles.container}>
          <Text>Add Question and Answer to Flashcard</Text>
          <InputField
            inputValue={this.state.question}
            handleTextChange={this.changeQuestionInput}
            placeholder='Write question here'
          />
          <InputField
            inputValue={this.state.answer}
            handleTextChange={this.changeAnswerInput}
            placeholder='Write answer here'
          />
          <View style={styles.buttonContainer}>
            <MainButton
              handlePress={this.onAddCard}
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
    paddingTop: 25
  },
  buttonContainer: {
    marginTop: 30,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    addCard: (data) => dispatch(addCard(data)),
  };
}

export default connect(null, mapDispatchToProps)(AddCard);
