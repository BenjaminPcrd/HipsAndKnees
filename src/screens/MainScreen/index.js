import React, { Component } from "react";
import {
  ScrollView
} from 'react-native';
import MenuButton from "../../components/MenuButton"

export default class App extends Component {
  static navigationOptions = {
    title: 'Hips And Knees',
    
  };
  
  render() {
    return (
      <ScrollView>
        <MenuButton color='rgb(237, 84, 57)' title='Exercise videos' subtitle='' onPress={() => this.props.navigation.navigate('ExerciseVideos')}/>
        <MenuButton color='rgb(67, 230, 137)' title='Traxivity' subtitle='' onPress={() => this.props.navigation.navigate('Traxivity')}/>
        <MenuButton color='rgb(72, 159, 217)' title='Exercise tracking' subtitle='' onPress={() => this.props.navigation.navigate('ExerciseTracking')}/>
        <MenuButton color='rgb(255, 188, 70)' title='Useful contacts' subtitle='' onPress={() => this.props.navigation.navigate('UsefulContacts')}/>
        <MenuButton color='rgb(144, 96, 219)' title='Questionnaire' subtitle='' onPress={() => this.props.navigation.navigate('Questionnaire')}/>
      </ScrollView>
    );
  }
}