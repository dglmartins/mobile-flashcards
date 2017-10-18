import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { nextQuestion, resetQuiz, finishQuiz, markCorrect, toggleAnswer } from '../actions'


class Quiz extends Component {
  
  componentWillMount() {
    this.props.resetQuiz()
  }

  markCorrect = () => {
    if (this.props.quizControl.questionNumber === this.props.deck.questions.length) {

      this.props.markCorrect();
      this.props.finishQuiz();

      return
    }

    this.props.toggleAnswer(false);
    this.props.markCorrect();
    this.props.nextQuestion();

  }

  markIncorrect = () => {
    if (this.props.quizControl.questionNumber === this.props.deck.questions.length) {
      this.props.finishQuiz();

      return
    }
    this.props.toggleAnswer(false);
    this.props.nextQuestion();

  }

  restart = () => {
    this.props.resetQuiz()

  }

  toggleAnswer = () => {
    this.props.quizControl.showingAnswer
      ? this.props.toggleAnswer(false)
      : this.props.toggleAnswer(true)
  }


  render () {
    return (
        (this.props.quizControl.quizFinished
          ? (
            <View style={styles.container}>
              <View>
                <Text style={styles.finishedText}>Finished! You're score was:</Text>
                <Text style={styles.scoreText}> {Math.round(100*this.props.quizControl.rightAnswerCount/this.props.deck.questions.length)}%</Text>
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
                      {this.props.quizControl.questionNumber} / {this.props.deck.questions.length}
                    </Text>
                  </View>
                  <View style={styles.questionContainer}>
                    {this.props.quizControl.showingAnswer
                      ? <Text style={styles.questionText}>{this.props.deck.questions[this.props.quizControl.questionNumber - 1].answer}</Text>
                      : <Text style={styles.questionText}>{this.props.deck.questions[this.props.quizControl.questionNumber - 1].question}</Text>
                    }
                  </View>
                  <View style={styles.toggleQAContainer}>
                    <TouchableOpacity onPress={this.toggleAnswer}>
                      <Text>
                        {this.props.quizControl.showingAnswer
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

function mapStateToProps({ decks, quizControl }, { navigation }) {
  return {
    deck: Object.keys(decks).map((title) => (
      decks[title]
    )).filter((deck) => (deck.title === navigation.state.params.title))[0],
    quizControl
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nextQuestion: () => dispatch(nextQuestion()),
    resetQuiz: () => dispatch(resetQuiz()),
    finishQuiz: () => dispatch(finishQuiz()),
    markCorrect: () => dispatch(markCorrect()),
    toggleAnswer: (data) => dispatch(toggleAnswer(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
