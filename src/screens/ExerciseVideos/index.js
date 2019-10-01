import React, { Component } from "react";
import {
  FlatList
} from 'react-native';
import TypeCard from '../../components/TypeCard';

const data = require('./data.json')

export default class ExerciseVideos extends Component {
  static navigationOptions = {
    title: 'Exercise Videos',
  };
  
  render() {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <TypeCard item={item} onPress={() => this.props.navigation.navigate('VideoList', { item: item })}/>}
        keyExtractor={item => item.id}
      />
    );
  }
}

