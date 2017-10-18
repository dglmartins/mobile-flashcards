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
import { addCard } from '../actions';
import { addCardAsyncStorage } from '../utils/api';


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


  render () {
    return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={(question) => this.setState({question})}
              placeholder='Write question here'
              underlineColorAndroid='#dedede'
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={(answer) => this.setState({answer})}
              placeholder='Write answer here'
              underlineColorAndroid='#dedede'
              multiLine={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.onAddCard}>
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
    fontSize: 10
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

function mapDispatchToProps(dispatch) {
  return {
    addCard: (data) => dispatch(addCard(data)),
  };
}

export default connect(null, mapDispatchToProps)(AddCard);
