import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Result extends React.Component {
  render() {
    let { correct, totalQuestions, slug, title } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
          <Text>Result</Text>
          <Text>You have answered {correct} out {totalQuestions} questions correctly.</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {slug, title})}>
            <Text>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', {slug: slug})}>
          <Text>Back to Quiz</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
