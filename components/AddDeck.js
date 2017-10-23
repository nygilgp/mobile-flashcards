import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DeckApi from '../utils/DeckApi'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Text>Submit</Text>
    </TouchableOpacity>
  )
}
export default class AddDeck extends React.Component {
  state = {
    deckTitle : '',
    slug: ''
  }
  addDeckTitle = (title, updateAppDecks) => {
    if(title != 'Deck Title' || title != '') {
      DeckApi.saveDeckTitle(title)
      .then(({decks, slug}) => {
        updateAppDecks(decks);
        this.setState({deckTitle : ''});
        this.props.navigation.navigate('Deck', { slug, title });
      });
    }
  }
  render() {
    const { updateAppDecks } = this.props.screenProps;
    return (
      <View style={{flex: 1}}>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            value={this.state.deckTitle}
          />
          <SubmitBtn onPress={() => this.addDeckTitle(this.state.deckTitle, updateAppDecks)} />
      </View>
    );
  }
}
