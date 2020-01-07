import React, { Component } from "react";
import {
  FlatList
} from 'react-native';
import ContactCard from '../../components/ContactCard';

import firebase from 'react-native-firebase';

export default class UsefulContacts extends Component {
  static navigationOptions = {
    title: 'Useful Contacts',
  };

  state = {
    data: ""
  }

  async componentDidMount() {
    const ref = firebase.firestore().collection('contacts')
    var contacts = await ref.get()
    contacts = contacts._docs.map(x => x._data)
    this.setState({data: contacts})
  }
  
  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => <ContactCard item={item}/>}
        keyExtractor={item => item.name}
      />
    );
  }
}
