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

//Class compoenent to reset quiz control on redux on componentWillMount, and to keep state of animation.
class Quiz extends Component {

  state = {
    cardRotateAnim: new Animated.Value(0),
    animationFinished: true
  }

  //dispatches action to reset quizControl reducer to initialState
  componentWillMount() {
    this.props.resetQuiz()
  }

  //Adds to correct score on redux, checks if quiz finished. if not hides the next answer and moves to next question.
  markCorrect = () => {
    this.props.markCorrect();
    if (this.props.quizControl.questionNumber === this.props.deck.questions.length) {
      this.props.finishQuiz();
      return
    }
    this.props.toggleAnswer(false);
    this.props.nextQuestion();

  }

  //checks if quiz finished. if not hides the next answer and moves to next question.
  markIncorrect = () => {
    if (this.props.quizControl.questionNumber === this.props.deck.questions.length) {
      this.props.finishQuiz();
      return
    }
    this.props.toggleAnswer(false);
    this.props.nextQuestion();

  }

  //allows restart of quiz by dispatching resetQuiz action to quizControl reducer
  restart = () => {
    this.props.resetQuiz()
  }

  //function to handle a turning of card animation. Saves whether the animation is finished in state, so buttons are not rendered while animation is active to avoid bugs.
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

  // allows the user to flip the card over to see the answer.
  toggleAnswer = () => {
    if (this.props.quizControl.showingAnswer) {
      this.props.toggleAnswer(false);
      this.animateCard(0);
    } else {
      this.props.toggleAnswer(true);
      this.animateCard(1);
    }
  }

  //renders the quiz result OR the quiz, depending on whether quiz is finised
  render () {

    //interpolates the animation for rotateX transform
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
            //renders QuizResults component if finished
            <View style={styles.container}>
              <QuizResults
                rightAnswerCount={rightAnswerCount}
                questionCount={questionCount}
                handlePress={this.restart}
              />
            </View>
          )
          : (
            //renders the Quiz if not finished. This is composed of a QuizProgress component, and Animated View and Text component, to animate the card and answer/question views, a button to mark correct and a button to mark Incorrect
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
