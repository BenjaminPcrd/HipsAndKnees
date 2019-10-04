import React, { Component } from "react";
import {
  FlatList
} from 'react-native';
import VideoCard from '../../components/VideoCard'

export default class VideoList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('item').type,
    }
  }


  render() {
    return (
      <FlatList
        data={this.props.navigation.getParam('item').videos}
        renderItem={({ item }) => <VideoCard item={item}/>}
        keyExtractor={item => item.id}
      />
    );
  }
}