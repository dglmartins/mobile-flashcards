export const ADD_DECK = 'ADD_DECK';

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
};
