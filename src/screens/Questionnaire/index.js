import React, { Component } from "react";
import {
  FlatList,
  Button
} from 'react-native';

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
    const ref = firebase.firestore().collection('users').doc(this.state.user.user.id);
    firebase.firestore().runTransaction(async transaction => {
      const doc = await transaction.get(ref);
      
      if(!doc.exists) {
        transaction.set(ref, {id: this.state.user.user.id})
        console.log("doc not exists")
      } else {
        transaction.update(ref, {id: this.state.user.user.id})
        console.log("doc exists")
      }

    }).then(() => console.log("updated")).catch(err => console.log("error: " + err))
  }

  _addAnswer(answer, question) {
    //console.log(typeof(answer))
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
    //console.log(this._answers.find(i => i.question.id == question.id).answers)
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