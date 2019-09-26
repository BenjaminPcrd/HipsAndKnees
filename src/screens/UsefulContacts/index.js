import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

export default class UsefulContacts extends Component {
  static navigationOptions = {
    title: 'Useful Contacts',
  };

  render() {
    return (
      <View>
          <Text>
            UsefulContacts
          </Text>
      </View>
    );
  }
}