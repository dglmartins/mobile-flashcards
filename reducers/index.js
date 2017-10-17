import { combineReducers } from 'redux';
import { decks } from './decksReducer';
import { quizControl } from './quizControlReducer';

export default combineReducers({
  decks,
  quizControl
});
