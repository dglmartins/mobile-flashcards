export const GET_ALL_DECKS = 'GET_ALL_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const PREV_QUESTION = 'PREV_QUESTION';

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

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

export function nextQuestion() {
  return {
    type: NEXT_QUESTION
  }
}

export function prevQuestion() {
  return {
    type: PREV_QUESTION
  }
}
