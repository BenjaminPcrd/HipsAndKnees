import React, { Component } from "react";
import {
  FlatList
} from 'react-native';
import VideoCard from '../../components/VideoCard'

export default class VideoList extends Component {
  static navigationOptions = {
    title: 'Videos',
  };

  render() {
    return (
      <FlatList
        data={this.props.navigation.getParam('item').videos}
        renderItem={({ item }) => <VideoCard item={item} onPress={() => this.props.navigation.navigate('Video', { item: item })}/>}
        keyExtractor={item => item.id}
      />
    );
  }
}