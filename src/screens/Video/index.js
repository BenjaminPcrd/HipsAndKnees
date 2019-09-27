import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

export default class Video extends Component {
  static navigationOptions = {
    title: 'Video',
  };

  render() {
    return (
      <View>
          <Text>
            Video
          </Text>
      </View>
    );
  }
}