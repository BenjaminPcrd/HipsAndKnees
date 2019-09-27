import React, { Component } from "react";
import {
  ScrollView,
  Text,
  FlatList
} from 'react-native';
import VideoCard from '../../components/VideoCard';

const videoData = require('./videoData.json')

export default class ExerciseVideos extends Component {
  static navigationOptions = {
    title: 'Exercise Videos',
  };
  
  render() {
    return (
      <FlatList
        data={videoData}
        renderItem={({ item }) => <VideoCard title={item.title} subtitle={item.subtitle} description={item.description} image={item.image} url={item.url} onPress={() => console.log('gfdgfd')}/>}
        keyExtractor={item => item.id}
      />
    );
  }
}

