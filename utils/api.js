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

export function removeDeckAsyncStorage (deck) {
  return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      delete data[deck]
      AsyncStorage.setItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addCardAsyncStorage (title, card) {
  return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const newData = {
        ...data,
        [title]: {
          ...data[title],
          questions: data[title].questions.concat(card)
        }
      }
      AsyncStorage.setItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify(newData))
    })
}
