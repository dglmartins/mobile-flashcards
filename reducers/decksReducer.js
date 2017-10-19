import {
  ADD_DECK,
  GET_ALL_DECKS,
  REMOVE_DECK,
  ADD_CARD
} from '../actions';
import R from 'ramda';

export function decks (state = {}, action) {
  const { title, decks, card } = action;
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
    case ADD_CARD:
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat(card)
        }
      };
    default:
      return state;
  }
}
