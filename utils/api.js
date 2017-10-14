import { AsyncStorage } from 'react-native';

const FLASHCARDS_DECK_STORAGE_KEY = 'Mobileflashcards:deck';

export function getDecksAsyncStorage () {
  return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
}

export function clearDecksAsyncStorage () {
  return AsyncStorage.removeItem(FLASHCARDS_DECK_STORAGE_KEY)
}

export function saveDeckAsyncStorage(title) {
  return AsyncStorage.mergeItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify({
    [title]: { title, questions: [] }
  }))
}

export function removeDeckAsyncStorage (key) {
  return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify(data))
    })
}
