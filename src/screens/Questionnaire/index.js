import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

export default class Questionnaire extends Component {
  static navigationOptions = {
    title: 'Questionnaire',
  };

  render() {
    return (
      <View>
          <Text>
            Questionnaire
          </Text>
      </View>
    );
  }
}