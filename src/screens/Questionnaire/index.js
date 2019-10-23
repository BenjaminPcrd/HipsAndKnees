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
  }

  componentDidMount() {
    GoogleSignin.getCurrentUser().then(user => this.setState({user})).catch(err => console.log(err))
  }

  _submit() {
    console.log(this.state.user.user.id)
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
  
  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <Question item={item} onChange={(answer) => console.log({question: item, answer: answer})}/>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => <Button color={'rgb(246, 200, 43)'} title={'Submit'} onPress={() => this._submit()}/>}
      />
    );
  }
}