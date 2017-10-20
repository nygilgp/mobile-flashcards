import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './helpers'
import slugify from 'slugify'

class DeckApi {
    // return all of the decks along with their titles, questions, and answers.
    static async getDecks() {
        //AsyncStorage.removeItem(DECK_STORAGE_KEY);
        return await AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((data) => JSON.parse(data))
        .then((data) => {
            // return the decks as an array for react to render
            if(data === null) {
                return null;
            }
            let decks = [];
            decks = Object.keys(data).map((key) => {
                return {
                    ...data[key],
                    slug: key
                }
            });
            return decks;
        });
    }
    // take in a single id argument and return the deck associated with that id.
    static async getDeck(titleId) {
        return await AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            return {
                ...data[titleId],
                slug: titleId
            }
        })
    }
    // take in a single title argument and add it to the decks.
    static async saveDeckTitle(title) {
        titleSlug = slugify(title, {remove: /[$*_+~.()'"!\-:@]/g});
        AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => JSON.parse(results))
        .then((results) => {
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({
                ...results,
                [titleSlug]: {
                    title: title,
                    questions: []
                }
              }))
        })
        return titleSlug;
    }
    // take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
    static async addCardToDeck(titleId, card) {
        return await AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => JSON.parse(results))
        .then((decks) => {
            decks[titleId]['questions'].push(card);
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks)).done();
        })
    }
}

export default DeckApi
