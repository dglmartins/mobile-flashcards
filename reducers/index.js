import {
  ADD_DECK,
  GET_ALL_DECKS
} from '../actions';

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
    case ADD_DECK:
      return {
        ...state,
        [title]: { title }
      };
    default:
      return state;
  }
}

export default reducer;
