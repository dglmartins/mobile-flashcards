import {
  NEXT_QUESTION,
  PREV_QUESTION
} from '../actions';

const initialState = {
  onQuestion: 0
}

export function quizControl (state = initialState, action) {
  switch (action.type) {
    case NEXT_QUESTION:
      return {
        ...state,
        onQuestion: state.onQuestion + 1
      };
    case PREV_QUESTION :
      return {
        ...state,
        onQuestion: state.onQuestion - 1
      };
    default:
      return state;
  }
}
