import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DeckApi from '../utils/DeckApi'

export default class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });
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
          <Text>{ deck['questions'] !== undefined && deck['questions'].length } cards</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Add Card', {slug: deck.slug, title: deck.title })}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          { deck['questions'] !== undefined && deck['questions'].length > 0 &&
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', {slug: deck.slug})}>
          <Text>Start Quiz</Text>
          </TouchableOpacity>
          }
      </View>
    );
  }
}
