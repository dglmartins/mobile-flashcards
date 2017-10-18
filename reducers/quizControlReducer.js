import {
  NEXT_QUESTION,
  RESET_QUIZ,
  FINISH_QUIZ,
  MARK_CORRECT,
  TOGGLE_ANSWER
} from '../actions';

const initialState = {
  questionNumber: 1,
  showingAnswer: false,
  rightAnswerCount: 0,
  quizFinished: false
}

export function quizControl (state = initialState, action) {
  switch (action.type) {
    case RESET_QUIZ:
      return initialState
    case NEXT_QUESTION:
      return {
        ...state,
        questionNumber: state.questionNumber + 1
      };
    case FINISH_QUIZ:
      return {
        ...state,
        quizFinished: true
      };
    case MARK_CORRECT:
      return {
        ...state,
        rightAnswerCount: state.rightAnswerCount + 1
      };

    case TOGGLE_ANSWER:
      return {
        ...state,
        showingAnswer: action.show
      };

    default:
      return state;
  }
}
