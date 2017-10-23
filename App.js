import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckApi from './utils/DeckApi'
import NotificationApi from './utils/NotificationApi'
import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Result from './components/Result'

function FlashStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  Decks: {
    screen: Decks
  },
  'New Deck': {
    screen: AddDeck
  }
});
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    header: null
  },
  Deck: {
    screen: Deck
  },
  'Add Card': {
    screen: AddCard
  },
  'Quiz': {
    screen: Quiz
  },
  'Result': {
    screen: Result
  }
},{
headerMode: 'none'
});

export default class App extends React.Component {
  state = {
    decks : null
  }
  componentDidMount() {
    DeckApi.getDecks().then((decks) => {
      this.setState({decks});
    }).done();
    NotificationApi.setLocalNotifications();
  }
  updateDecks = (decks) => {
    this.setState({decks});
  }
  /*
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

  <Decks decks={decks}  />
  <AddDeck updateAppDecks={this.updateDecks} />
  */
  render() {
    const { decks } = this.state;
    const updateAppDecks = this.updateDecks;
    return (
      <View style={{flex: 1}}>
          <FlashStatusBar  backgroundColor='black' barStyle="light-content" />
          <MainNavigator screenProps={{decks, updateAppDecks}}  />

      </View>
    );
  }
}
