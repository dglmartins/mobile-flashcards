import { ADD_DECK } from '../actions';

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

function reducer (state = initialState, action) {
  const { title } = action;
  switch (action.type) {
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
