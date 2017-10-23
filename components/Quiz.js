import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import DeckApi from '../utils/DeckApi'

export default class Quiz extends React.Component {
  state = {
    deck: null,
    totalQuestion: 0,
    correctAnswers: 0,
    answeredQuestionsCount: 0,
    currentQuizRender: null,
    answerOpacity: new Animated.Value(0),
    questionOpacity: new Animated.Value(1)
  }
  componentDidMount = () => {
    const { slug } = this.props.navigation.state.params;
    DeckApi.getDeck(slug).then((deck) => {
        this.setState({deck});
        const totalQuestion = deck['questions'].length;
        this.setState({totalQuestion});
        this.renderCurrentQuiz(null);
    }).done();
  }
  renderCurrentQuiz = (answer) => {
    const  quizCounter = answer === null ? 0 : this.state.answeredQuestionsCount + 1;
    this.animateQuestion();
    if(quizCounter == this.state.totalQuestion) {
      const { slug } = this.props.navigation.state.params;
      this.setState((prevState) => ({
            correctAnswers: answer ? prevState.correctAnswers + 1 : prevState.correctAnswers,
            answeredQuestionsCount: prevState.answeredQuestionsCount + 1,
        }))
      this.props.navigation.navigate('Result', {
        correct: answer ? this.state.correctAnswers + 1: this.state.correctAnswers,
        totalQuestions: this.state.totalQuestion,
        slug });
    } else {
      const currentQuizRender = this.loadCurrentQuizView(quizCounter);
      if(answer != null) {
        this.setState((prevState) => ({
            correctAnswers: answer ? prevState.correctAnswers + 1 : prevState.correctAnswers,
            answeredQuestionsCount: prevState.answeredQuestionsCount + 1,
            currentQuizRender
        }))
      } else {
        this.setState((prevState) => ({
            currentQuizRender
        }))
      }
    }
  }
  animateAnswer = () => {
    let { answerOpacity, questionOpacity } = this.state;
    Animated.timing( answerOpacity , { toValue: 1, duration: 10 }).start();
    Animated.timing( questionOpacity , { toValue: 0, duration: 10 }).start();
  }
  animateQuestion = () => {
    let { answerOpacity, questionOpacity } = this.state;
    Animated.timing( questionOpacity , { toValue: 1, duration: 10 }).start();
    Animated.timing( answerOpacity , { toValue: 0, duration: 10 }).start();
  }
  loadCurrentQuizView = (quizToLoad) => {
    const card = this.state.deck['questions'][quizToLoad];
    const { answerOpacity, questionOpacity } = this.state;
    return (
        <View>
          <Animated.View style={{ opacity: questionOpacity }}>
            <Text>{card.question}</Text>
            <TouchableOpacity onPress={() => this.animateAnswer()}>
              <Text>Answer</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: answerOpacity }}>
            <Text>{card.answer}</Text>
            <TouchableOpacity onPress={() => this.animateQuestion()}>
              <Text>Question</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
    )
  }
  render() {
    let { deck, totalQuestion, answeredQuestionsCount, correctAnswers, currentQuizRender } = this.state;
    if(deck === null || totalQuestion === 0) {
      return (
        <View>
          <Text>Unable to load questions.</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {slug: deck.slug})}>
            <Text>Go back to deck</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
          <Text>{answeredQuestionsCount + 1}/{totalQuestion}</Text>
          <Text>Corrent: {correctAnswers}</Text>
          <Text>Quiz page { deck.title }</Text>
          <View>{ currentQuizRender }</View>
          <TouchableOpacity onPress={() => this.renderCurrentQuiz(true)}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.renderCurrentQuiz(false)}>
          <Text>Incorrect</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
