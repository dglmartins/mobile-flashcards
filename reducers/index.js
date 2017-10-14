import {
  ADD_DECK,
  GET_ALL_DECKS,
  REMOVE_DECK
} from '../actions';
import R from 'ramda';

const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

function reducer (state = {}, action) {
  const { title, decks } = action;
  switch (action.type) {
    case GET_ALL_DECKS:
      return decks;
    case REMOVE_DECK:
      return R.omit([title], state);
    case ADD_DECK:
      return {
        ...state,
        [title]: { title, questions: [] }
      };
    default:
      return state;
  }
}

export default reducer;
