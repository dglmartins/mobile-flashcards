import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { nextQuestion, resetQuiz, finishQuiz, markCorrect, toggleAnswer } from '../../actions';
import QuizResults from './components/QuizResults';
import QuizProgress from './components/QuizProgress';
import ToggleAnswerButton from './components/ToggleAnswerButton';
import MainButton from '../components/MainButton';

class Quiz extends Component {

  state = {
    cardRotateAnim: new Animated.Value(0),
    animationFinished: true
  }

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

  animateCard = (value) => {
    this.setState({ animationFinished: false});
      Animated.timing(
        this.state.cardRotateAnim,
        {
          toValue: value,
          duration: 300
        }
      ).start();
    setTimeout(() => this.setState({ animationFinished: true }), 300);
  }

  toggleAnswer = () => {
    if (this.props.quizControl.showingAnswer) {
      this.props.toggleAnswer(false);
      this.animateCard(0);
    } else {
      this.props.toggleAnswer(true);
      this.animateCard(1);
    }
  }


  render () {
    const rotateX = this.state.cardRotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    const { rightAnswerCount, questionNumber, showingAnswer, quizFinished } = this.props.quizControl;
    const { animationFinished } = this.state;
    const { questions } = this.props.deck;
    const questionCount = questions.length;
    const cardBackgroundColor = showingAnswer ? '#ea7a87' : '#16aacb'
    return (
        (quizFinished
          ? (
            <View style={styles.container}>
              <QuizResults
                rightAnswerCount={rightAnswerCount}
                questionCount={questionCount}
                handlePress={this.restart}
              />
            </View>
          )
          : (
            <View style={styles.container}>
              {this.props.deck && (
                <View>
                  <QuizProgress
                    questionCount={questionCount}
                    questionNumber={questionNumber}
                  />
                  <Animated.View style={[styles.questionAnswerContainer, {transform: [{ rotateX }]},{backgroundColor: cardBackgroundColor}]}>

                      <Animated.Text style={[styles.questionText, {transform: [{ rotateX }]}]}>
                        {showingAnswer
                          ? questions[questionNumber - 1].answer
                          : questions[questionNumber - 1].question
                        }
                      </Animated.Text>

                  </Animated.View>
                  {this.state.animationFinished && (
                    <View>
                      <ToggleAnswerButton
                        showingAnswer={showingAnswer}
                        handlePress={this.toggleAnswer}
                      />
                      <View style={styles.buttonContainer}>
                        <MainButton
                          handlePress={this.markCorrect}
                          buttonText="Correct"
                        />
                        <MainButton
                          handlePress={this.markIncorrect}
                          buttonText="Incorrect"
                          extraStyle={{backgroundColor: "#ea7a87"}}
                        />
                      </View>
                    </View>
                  )}
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
  },
  questionAnswerContainer: {
    alignSelf: 'stretch',
    borderWidth: 4,
    borderColor: '#dedede',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#006c84',
    height: 200,
    marginLeft: 25,
    marginRight: 25

  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
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
