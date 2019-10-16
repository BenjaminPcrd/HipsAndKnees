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
  }
  
  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <Question item={item} onChange={(answer) => console.log({question: item, answer: answer})}/>}
        keyExtractor={item => item.id}
        ListFooterComponent={() => <Button title={'Submit'} onPress={() => console.log("submit")}/>}
      />
    );
  }
}