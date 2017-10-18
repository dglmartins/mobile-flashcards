import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { nextQuestion, resetQuiz, finishQuiz, markCorrect, toggleAnswer } from '../../actions';
import QuizResults from './components/QuizResults';
import QuizProgress from './components/QuizProgress';
import QACard from './components/QACard';
import ToggleAnswerButton from './components/ToggleAnswerButton';
import QuizButton from './components/QuizButton';


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
              <QuizResults
                rightAnswerCount={this.props.quizControl.rightAnswerCount}
                questionCount={this.props.deck.questions.length}
                handlePress={this.restart}
              />
            </View>
          )
          : (
            <View style={styles.container}>
              {this.props.deck && (
                <View>
                  <QuizProgress
                    questionCount={this.props.deck.questions.length}
                    questionNumber={this.props.quizControl.questionNumber}
                  />
                  <QACard
                    showingAnswer={this.props.quizControl.showingAnswer}
                    answer={this.props.deck.questions[this.props.quizControl.questionNumber - 1].answer}
                    question={this.props.deck.questions[this.props.quizControl.questionNumber - 1].question}
                  />
                  <ToggleAnswerButton
                    showingAnswer={this.props.quizControl.showingAnswer}
                    handlePress={this.toggleAnswer}
                  />
                  <View style={styles.buttonContainer}>
                    <QuizButton
                      handlePress={this.markCorrect}
                      buttonText="Correct"
                      extraStyle={{}}
                    />
                    <QuizButton
                      handlePress={this.markIncorrect}
                      buttonText="Incorrect"
                      extraStyle={{backgroundColor: "#ea7a87"}}
                    />
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
  buttonContainer: {
    marginTop: 30,
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
