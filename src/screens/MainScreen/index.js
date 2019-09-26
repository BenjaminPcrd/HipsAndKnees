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
        <MenuButton color='red' title='Exercise videos' subtitle='' onPress={() => this.props.navigation.navigate('ExerciseVideos')}/>
        <MenuButton color='blue' title='Exercise tracking' subtitle='' onPress={() => this.props.navigation.navigate('ExerciseTracking')}/>
        <MenuButton color='green' title='Traxivity' subtitle='' onPress={() => this.props.navigation.navigate('Traxivity')}/>
        <MenuButton color='orange' title='Useful contacts' subtitle='' onPress={() => this.props.navigation.navigate('UsefulContacts')}/>
        <MenuButton color='purple' title='Questionnaire' subtitle='' onPress={() => this.props.navigation.navigate('Questionnaire')}/>
      </ScrollView>
    );
  }
}