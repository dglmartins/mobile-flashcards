import { AsyncStorage } from 'react-native';

const FLASHCARDS_DECK_STORAGE_KEY = 'Mobileflashcards:deck';

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
}

export function clearDecks () {
  return AsyncStorage.removeItem(FLASHCARDS_DECK_STORAGE_KEY)
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify({
    [title]: { title, questions: [] }
  }))
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function deleteDeck (key) {
  return AsyncStorage.getItem(FLASHCARDS_DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_DECK_STORAGE_KEY, JSON.stringify(data))
    })
}
