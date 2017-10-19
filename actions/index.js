export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const PREV_QUESTION = 'PREV_QUESTION';
export const RESET_QUIZ = 'RESET_QUIZ';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const MARK_CORRECT = 'MARK_CORRECT';
export const TOGGLE_ANSWER = 'TOGGLE_ANSWER';

//Decks Actions
export function getAllDecks(decks) {
  return {
    type: GET_ALL_DECKS,
    decks
  }
};

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
};

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  }
};

export function addCard({title, card}) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

//QuizControl actions
export function nextQuestion() {
  return {
    type: NEXT_QUESTION
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function markCorrect() {
  return {
    type: MARK_CORRECT
  }
}

export function toggleAnswer(show) {
  return {
    type: TOGGLE_ANSWER,
    show
  }
}
