import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation'
// import { addDeck } from '../actions';
// import { saveDeckAsyncStorage } from '../utils/api';


class Quiz extends Component {
  state = {
    questionNumber: 1,
    showingAnswer: false,
    rightAnswerCount: 0,
    quizFinished: false
  }

  markCorrect = () => {
    if (this.state.questionNumber === this.props.deck.questions.length) {
      this.setState((state) => ({
        quizFinished: true,
        rightAnswerCount: state.rightAnswerCount + 1
      }))
      return
    }
    this.setState((state) => ({
      rightAnswerCount: state.rightAnswerCount + 1,
      questionNumber: state.questionNumber + 1
    }))
  }

  markIncorrect = () => {
    if (this.state.questionNumber === this.props.deck.questions.length) {
      this.setState((state) => ({
        quizFinished: true,
      }))
      return
    }
    this.setState((state) => ({
      questionNumber: state.questionNumber + 1
    }))
  }

  restart = () => {
    this.setState({
      questionNumber: 1,
      showingAnswer: false,
      rightAnswerCount: 0,
      quizFinished: false
    })
  }

  toggleAnswer = () => {
    this.state.showingAnswer
      ? this.setState({ showingAnswer: false })
      : this.setState({ showingAnswer: true })
  }


  render () {
    return (
        (this.state.quizFinished
          ? (
            <View style={styles.container}>
              <View>
                <Text style={styles.finishedText}>Finished! You're score was:</Text>
                <Text style={styles.scoreText}> {Math.round(100*this.state.rightAnswerCount/this.props.deck.questions.length)}%</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={this.restart}>Restart</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <View style={styles.container}>
              {this.props.deck && (
                <View>
                  <View style={styles.progressContainer}>
                    <Text>
                      {this.state.questionNumber} / {this.props.deck.questions.length}
                    </Text>
                  </View>
                  <View style={styles.questionContainer}>
                    {this.state.showingAnswer
                      ? <Text style={styles.questionText}>{this.props.deck.questions[this.state.questionNumber - 1].answer}</Text>
                      : <Text style={styles.questionText}>{this.props.deck.questions[this.state.questionNumber - 1].question}</Text>
                    }
                  </View>
                  <View style={styles.toggleQAContainer}>
                    <TouchableOpacity onPress={this.toggleAnswer}>
                      <Text>
                        {this.state.showingAnswer
                          ? "Show question"
                          : "Show answer"
                        }
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText} onPress={this.markCorrect}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, {backgroundColor: "#ea7a87"}]}
                      onPress={this.markIncorrect}
                    >
                      <Text style={styles.buttonText}>Incorrect</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )
        )
      )
    }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 15

  },
  progressContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
  },
  progressText: {
    fontWeight: 'bold',
  },
  questionContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 25,
  },
  questionText: {
    fontSize: 25,
    textAlign: 'center'
  },
  toggleQAContainer: {
    alignSelf: 'center',
    marginTop: 30,
    marginRight: 15,
    marginLeft: 15,
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
    alignSelf: 'center',
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
    elevation: 1,
    marginBottom: 15
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
  finishedText: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  scoreText: {
    marginTop: 20,
    fontSize: 50,
    textAlign: 'center',
    color: '#ea7a87',
    marginBottom: 25,

  }
});

function mapStateToProps({ decks }, { navigation }) {
  return {
    deck: Object.keys(decks).map((title) => (
      decks[title]
    )).filter((deck) => (deck.title === navigation.state.params.title))[0]
  };
}

export default connect(mapStateToProps)(Quiz);
