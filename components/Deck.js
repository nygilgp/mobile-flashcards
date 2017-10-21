import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DeckApi from '../utils/DeckApi'
import AddCard from './AddCard'

export default class Deck extends React.Component {
  state = {
    deck: null
  }
  componentDidMount = () => {
    let { slug } = this.props.navigation.state.params;
    DeckApi.getDeck(slug).then((deck) => {
        this.setState({deck});
    }).done();
  }
  render() {
    let { deck } = this.state;
    if(deck === null) {
      return (
        <View>
          <Text>Unable to load deck.</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
          <Text>{ deck.title }</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Add Card', {slug: deck.slug})}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <Text>Start Quiz</Text>
      </View>
    );
  }
}
