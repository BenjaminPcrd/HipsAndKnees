import React, { Component } from "react";
import {
  FlatList
} from 'react-native';
import ContactCard from '../../components/ContactCard';

const data = require('./contactsData.json')

export default class UsefulContacts extends Component {
  static navigationOptions = {
    title: 'Useful Contacts',
  };
  
  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <ContactCard item={item}/>}
        keyExtractor={item => item.id}
      />
    );
  }
}
