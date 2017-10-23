import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Result extends React.Component {
  render() {
    let { correct, totalQuestions, slug, title } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
          <Text style={{ fontSize: 34, textAlign: 'center' }}>You have answered {correct} out {totalQuestions} questions correctly.</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Deck', {slug, title})}>
            <Text style={styles.buttonText} >Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Quiz', {slug: slug})}>
          <Text style={styles.buttonText} >Back to Quiz</Text>
          </TouchableOpacity>
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
