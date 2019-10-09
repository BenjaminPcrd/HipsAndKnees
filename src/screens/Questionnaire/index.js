import React, { Component } from "react";
import {
  FlatList,
  Button
} from 'react-native';

import Question from '../../components/Question'
const data = require('./dataQuestionnaire.json')

export default class Questionnaire extends Component {
  static navigationOptions = {
    title: 'Questionnaire',
  };

  constructor(props) {
    super(props)
    this.answers = []
  }
  
  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <Question item={item} onChange={(answer) => this.answers.push({question: item, answer: answer})}/>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => <Button title={'Submit'} onPress={() => console.log(this.answers)}/>}
      />
    );
  }
}