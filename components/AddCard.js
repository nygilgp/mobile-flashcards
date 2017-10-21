import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DeckApi from '../utils/DeckApi'

function SubmitBtnCard ({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Text>Submit</Text>
    </TouchableOpacity>
  )
}
export default class AddCard extends React.Component {
  state = {
    question: '',
    answer: ''
  }
  addCard = (slug, card, updateAppDecks) => {
    if(card.question != 'Deck Title' || card.question != '') {
      DeckApi.addCardToDeck(slug, card)
      .then(({decks}) => {
        //updateAppDecks(decks);
        this.setState({question : '', answer: ''});
      });
    }
  }
  render() {
    let { slug } = this.props.navigation.state.params;
    const { updateAppDecks } = this.props.screenProps;
    return (
      <View style={{flex: 1}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
          <SubmitBtnCard onPress={() => this.addCard(slug, {question:this.state.question, answer:this.state.answer}, updateAppDecks )} />
      </View>
    );
  }
}



