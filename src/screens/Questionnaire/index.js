import React, { Component } from "react";
import {
  FlatList,
  Button,
  Alert
} from 'react-native';
import { ToastAndroid } from 'react-native';

import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import Question from '../../components/Question'
const data = require('./dataQuestionnaire.json')

export default class Questionnaire extends Component {
  static navigationOptions = {
    title: 'Questionnaire',
  };

  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this._answers = data.map(q => { return({answers: [], question: q}) })
  }

  componentDidMount() {
    GoogleSignin.getCurrentUser().then(user => this.setState({user})).catch(err => console.log(err))
  }

  _submit() {
    if(!this._answers.find(i => i.answers.length == 0)) {
      const ref = firebase.firestore().collection('users').doc(this.state.user.user.id);
      firebase.firestore().runTransaction(async transaction => {
        const doc = await transaction.get(ref);
        
        if(!doc.exists) {
          transaction.set(ref, {user: this.state.user.user, questionnaire: [{date: new Date(), results: this._answers}]})
        } else {
          var prevQuest = doc._data.questionnaire
          transaction.update(ref, {user: this.state.user.user, questionnaire: [...prevQuest, {date: new Date(), results: this._answers}]})
        }

      }).then(() => {
        Alert.alert('Thank you', 'Answers have been saved', [
          {text: 'ok', onPress: () => this.props.navigation.goBack()}
        ])
      }).catch(err => {
        Alert.alert('Oups, An error occurred', err+"", [
          {text: 'ok', onPress: () => this.props.navigation.goBack()}
        ])
      })
    } else {
      ToastAndroid.show('Please, answer all questions', ToastAndroid.SHORT);
    }
  }

  _addAnswer(answer, question) {
    var element = this._answers.find(i => i.question.id == question.id)
    if(question.type == "MULTIPLE_CHOICE_MULTIPLE_ANSWER") {
      if(element.answers.includes(answer)) {
        this._answers.find(i => i.question.id == question.id).answers.splice(element.answers.indexOf(answer), 1)
      } else {
        this._answers.find(i => i.question.id == question.id).answers.push(answer)
      }
    } else {
      if(element.answers.includes(answer)) {
        this._answers.find(i => i.question.id == question.id).answers = []
      } else {
        this._answers.find(i => i.question.id == question.id).answers[0] = answer
      }
    }
  }
  
  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <Question item={item} onChange={(answer) => this._addAnswer(answer, item)}/>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => <Button color={'rgb(246, 200, 43)'} title={'Submit'} onPress={() => this._submit()}/>}
      />
    );
  }
}