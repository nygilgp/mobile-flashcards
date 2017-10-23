import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import DeckApi from '../utils/DeckApi'

export default class Decks extends React.Component {
  _keyExtractor = (item, index) => {
    return item.slug;
  }
  render() {
    const {decks} = this.props.screenProps;
    if(decks === null) {
      return (
        <View style={{flex: 1}}>
          <Text>No decks, please go ahead and add some decks.</Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
          <FlatList
            data={ decks }
            renderItem = { ({item}) => {
              return(
                <View>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {slug: item.slug})}>
                  <Text>{ item.title }</Text>
                  <Text>{ item['questions'] !== undefined && item['questions'].length } cards</Text>
                  </TouchableOpacity>
                </View>
              )
            } }
            keyExtractor={this._keyExtractor}
            />
      </View>
    );
  }
}
