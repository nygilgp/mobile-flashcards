import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import DeckApi from '../utils/DeckApi'

function SubmitBtn ({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={ style.button }>
        <Text style={ style.buttonText }>Submit</Text>
    </TouchableOpacity>
  )
}
export default class AddDeck extends React.Component {
  state = {
    deckTitle : '',
    slug: '',
    error: true,
    behavior: 'position',
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
      <View style={styles.container}>
          <KeyboardAvoidingView behavior={this.state.behavior} style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingTop: 20,
          }} >
          <Text style={{ fontSize: 34, textAlign: 'center' }}>What is the title of your new deck?</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 12}}
            onChangeText={(deckTitle) => this.setState({deckTitle})}
            placeholder='Deck Title'
            value={this.state.deckTitle}
          />

          <SubmitBtn
          style={{...styles}}
          onPress={() => {
            if(this.state.deckTitle !== '') {
                this.setState({error:false});
                this.addDeckTitle(this.state.deckTitle, updateAppDecks)
            }
          }} />
          </KeyboardAvoidingView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
