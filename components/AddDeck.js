import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckApi from '../utils/DeckApi'

export default class AddDeck extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
          <Text>What is the title of your new deck?</Text>

      </View>
    );
  }
}
