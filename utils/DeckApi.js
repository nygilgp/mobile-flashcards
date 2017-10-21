import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, slugify } from './helpers'

class DeckApi {
    // return all of the decks along with their titles, questions, and answers.
    static async getDecks() {
        //return AsyncStorage.setItem(DECK_STORAGE_KEY, '');
        return await AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((data) => JSON.parse(data))
        .then((data) => {
            // return the decks as an array for react to render
            if(data === null || data === '') {
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
        if(title == '') {
            return null;
        }
        titleSlug = slugify(title);
        return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => JSON.parse(results))
        .then((results) => {
            let data = {};
            if(results === '' || results === null ) {
                data = {
                    [titleSlug]: {
                        title: title,
                        questions: []
                    }
                }
            } else {
                data = {
                    ...results,
                    [titleSlug]: {
                        title: title,
                        questions: []
                    }
                }
            }
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data)).done();
            let decks = [];
            decks = Object.keys(data).map((key) => {
                return {
                    ...data[key],
                    slug: key
                }
            });
            return {decks, slug: titleSlug};
        });
    }
    // take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
    static async addCardToDeck(titleId, card) {
        return await AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => JSON.parse(results))
        .then((data) => {
            data[titleId]['questions'].push(card);
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data)).done();
            let decks = [];
            decks = Object.keys(data).map((key) => {
                return {
                    ...data[key],
                    slug: key
                }
            });
            return { decks };
        })
    }
}

export default DeckApi
