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
        <View style={{flex: 1, backgroundColor: 'white',
          justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{ textAlign: 'center' }}>No decks, please go ahead and add some decks.</Text>
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
                  <TouchableOpacity  style={styles.item} onPress={() => this.props.navigation.navigate('Deck', {slug: item.slug, title: item.title})}>
                  <Text style={{textAlign: 'center', fontSize: 24 }}>{ item.title }</Text>
                  <Text style={{textAlign: 'center', color: '#666666'}}>{ item['questions'] !== undefined && item['questions'].length } cards</Text>
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    padding: 10
  }
});
