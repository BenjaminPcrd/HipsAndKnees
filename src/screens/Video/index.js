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
        <Text>id: {this.props.navigation.getParam('item').id}</Text>
        <Text>title: {this.props.navigation.getParam('item').title}</Text>
        <Text>subtitle: {this.props.navigation.getParam('item').subtitle}</Text>
        <Text>description: {this.props.navigation.getParam('item').description}</Text>
        <Text>image: {this.props.navigation.getParam('item').image}</Text>
        <Text>url: {this.props.navigation.getParam('item').url}</Text>
      </View>
    );
  }
}