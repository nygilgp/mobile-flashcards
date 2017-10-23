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
import { AppLoading} from 'expo'

function FlashStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
  },
  'New Deck': {
    screen: AddDeck
  }
}, {
  tabBarOptions: {
      style: {
        backgroundColor: 'black',
      },
    }
});
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  'Add Card': {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  'Quiz': {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  'Result': {
    screen: Result,
    navigationOptions: {
      title: 'Result',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  }
});

export default class App extends React.Component {
  state = {
    decks : null,
    ready: false,
  };
  componentDidMount() {
    DeckApi.getDecks().then((decks) => {
      this.setState({decks});
    })
    .then(() => this.setState(() => ({ready: true})))
    .done();
    NotificationApi.setLocalNotifications();
  }
  updateDecks = (decks) => {
    this.setState({decks});
  }
  render() {
    const { decks, ready } = this.state;
    const updateAppDecks = this.updateDecks;
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View style={{flex: 1}}>
          <FlashStatusBar  backgroundColor='black' barStyle="light-content" />
          <MainNavigator screenProps={{decks, updateAppDecks}}  />
      </View>
    );
  }
}
