import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

export default class ExerciseTracking extends Component {
  static navigationOptions = {
      title: 'Exercise Tracking',
  };

  render() {
    return (
      <View>
          <Text>
            ExerciseTracking
          </Text>
      </View>
    );
  }
}