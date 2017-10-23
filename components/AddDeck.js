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
    slug: '',
    error: true
  }
  addDeckTitle = (title, updateAppDecks) => {
      DeckApi.saveDeckTitle(title)
      .then(({decks, slug}) => {
        updateAppDecks(decks);
        this.setState({deckTitle : '', error: true});
        this.props.navigation.navigate('Deck', { slug, title });
      });
  }
  render() {
    const { updateAppDecks } = this.props.screenProps;
    return (
      <View style={{flex: 1}}>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            placeholder='Deck Title'
            value={this.state.deckTitle}
          />
          <SubmitBtn onPress={() => {
            if(this.state.deckTitle !== '') {
                this.setState({error:false});
                this.addDeckTitle(this.state.deckTitle, updateAppDecks)
            }
          }} />
      </View>
    );
  }
}
