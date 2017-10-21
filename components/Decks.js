import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import DeckApi from '../utils/DeckApi'

export default class Decks extends React.Component {
  _keyExtractor = (item, index) => item.slug;
  renderItem({item}) {
    return (
      <View>
        <Text>{ item.title }</Text>
        <Text>{ item['questions'] !== undefined && item['questions'].length }</Text>
      </View>
    )
  }
  render() {
    const {decks} = this.props;
    if(decks === null) {
      return (
        <View style={{flex: 1}}>
          <Text>No decks, please go on and add some decks.</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
          <FlatList
            data={ decks }
            renderItem = { this.renderItem }
            keyExtractor={this._keyExtractor}
            />
      </View>
    );
  }
}
