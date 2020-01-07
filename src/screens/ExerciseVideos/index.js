import React, { Component } from "react";
import {
  FlatList
} from 'react-native';
import TypeCard from '../../components/TypeCard';

import firebase from 'react-native-firebase';

export default class ExerciseVideos extends Component {
  static navigationOptions = {
    title: 'Exercise Videos',
  };

  state = {
    data: ""
  }

  async componentDidMount(props) {
    const ref = firebase.firestore().collection('videos')
    var videos = await ref.get()
    videos = videos._docs.map(x => x._data)
    this.setState({data: videos})
  }
  
  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item }) => <TypeCard item={item} onPress={() => this.props.navigation.navigate('VideoList', { item: item })}/>}
        keyExtractor={item => item.id}
      />
    );
  }
}

