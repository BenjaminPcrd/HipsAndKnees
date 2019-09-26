import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

export default class ExerciseVideos extends Component {
  static navigationOptions = {
    title: 'Exercise Videos',
  };
  
  render() {
    return (
      <View>
          <Text>
            ExerciseVideos
          </Text>
      </View>
    );
  }
}