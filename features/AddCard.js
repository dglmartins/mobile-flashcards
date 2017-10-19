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


class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

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

  changeQuestionInput = (question) => {
    this.setState({ question })
  }

  changeAnswerInput = (answer) => {
    this.setState({ answer })
  }

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
