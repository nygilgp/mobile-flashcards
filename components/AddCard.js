import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import DeckApi from '../utils/DeckApi'

function SubmitBtnCard ({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={ style.button }>
        <Text style={ style.buttonText }>Submit</Text>
    </TouchableOpacity>
  )
}
export default class AddCard extends React.Component {
  state = {
    question: '',
    answer: '',
    error: true
  }
  addCard = (slug, card, updateAppDecks) => {
    const { title } = this.props.navigation.state.params;
      DeckApi.addCardToDeck(slug, card)
      .then(({decks}) => {
        updateAppDecks(decks);
        this.setState({question : '', answer: '', error: true});
        this.props.navigation.navigate('Deck', { slug, title });
      });
  }
  render() {
    let { slug } = this.props.navigation.state.params;
    const { updateAppDecks } = this.props.screenProps;
    return (
      <View style={style=styles.container}>
        <KeyboardAvoidingView behavior={this.state.behavior} style={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            paddingTop: 20,
          }} >
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 30}}
            onChangeText={(question) => this.setState({question})}
            placeholder='Question'
            value={this.state.question}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(answer) => this.setState({answer})}
            placeholder='Answer'
            value={this.state.answer}
          />
          <SubmitBtnCard
          style={{...styles}}
          onPress={() => {
            if(this.state.question !== '' && this.state.answer !== '') {
                this.setState({error:false});
                this.addCard(slug, {question:this.state.question, answer:this.state.answer}, updateAppDecks )
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
