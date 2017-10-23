import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import DeckApi from '../utils/DeckApi'
import NotificationApi from '../utils/NotificationApi'

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
        if(totalQuestion > 0) {
          this.renderCurrentQuiz(null);
        }
    }).done();
  }
  renderCurrentQuiz = (answer) => {
    const  quizCounter = answer === null ? 0 : this.state.answeredQuestionsCount + 1;
    const { slug } = this.props.navigation.state.params;
    this.animateQuestion();
    if(quizCounter >= this.state.totalQuestion) {
      NotificationApi.clearLocalNotifications()
      .then(NotificationApi.setLocalNotifications);
      this.props.navigation.navigate('Result', {
        correct: answer ? this.state.correctAnswers + 1: this.state.correctAnswers,
        totalQuestions: this.state.totalQuestion,
        slug,
        title: this.state.deck.title });
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
            <Text style={{ fontSize: 24, textAlign: 'center' }}>{card.question}</Text>
            <TouchableOpacity onPress={() => this.animateAnswer()}>
              <Text style={{ textAlign: 'center', color: 'maroon' }}>Answer</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: answerOpacity }}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>{card.answer}</Text>
            <TouchableOpacity onPress={() => this.animateQuestion()}>
              <Text style={{ textAlign: 'center', color: 'green' }}>Question</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
    )
  }
  render() {
    let { deck, totalQuestion, answeredQuestionsCount, correctAnswers, currentQuizRender } = this.state;
    if(totalQuestion === 0) {
      return (
        <View>
          <Text>Unable to load questions.</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {slug: deck.slug})}>
            <Text>Go back to deck</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
            <Text style={{
              flex: 1,
              justifyContent:'flex-start',
              alignItems: 'flex-start'
            }}>{answeredQuestionsCount + 1 >  totalQuestion ? totalQuestion :  answeredQuestionsCount + 1}/{totalQuestion}</Text>
            <View style={{
              flex: 1,
              justifyContent:'flex-start',
              alignItems: 'center'
            }}>{ currentQuizRender }</View>
            <TouchableOpacity style={styles.button} onPress={() => this.renderCurrentQuiz(true)}>
              <Text style={styles.buttonText} >Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.renderCurrentQuiz(false)}>
            <Text style={styles.buttonText} >Incorrect</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
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
