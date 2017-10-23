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
        <View style={styles.container}>
          <Text>Unable to load deck.</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
          <Text style={{ fontSize: 34, textAlign: 'center' }}>{ deck.title }</Text>
          <Text style={{ fontSize: 12, textAlign: 'center', color: '#666666' }}>{ deck['questions'] !== undefined && deck['questions'].length } cards</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Add Card', {slug: deck.slug, title: deck.title })}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          { deck['questions'] !== undefined && deck['questions'].length > 0 &&
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Quiz', {slug: deck.slug})}>
          <Text style={styles.buttonText} >Start Quiz</Text>
          </TouchableOpacity>
          }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: 'white',
    fontSize: 20,
  }
});
