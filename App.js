import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckApi from './utils/DeckApi'

export default class App extends React.Component {
  state = {
    decks : null
  }
  componentDidMount() {
    question = {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      };
    DeckApi.saveDeckTitle('Deck2');
    //DeckApi.addCardToDeck('Deck2', question).done();
    DeckApi.getDeck('Deck2').then((deck) => {
      console.log(deck);
    }).done();
    DeckApi.getDecks().then((decks) => {
      this.setState({decks});
      console.log(decks);
    }).done();
  }
  render() {



    return (
      <View style={styles.container}>
        <Text>Testing API</Text>
        <Text> what is the problem {

          (this.state.decks !== null && this.state.decks.map((deck) => {
            return deck.title + ' - ' + deck['questions'].length
          }))

         }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
