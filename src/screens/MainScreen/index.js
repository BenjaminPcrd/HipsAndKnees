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
        <MenuButton color='rgb(253, 100, 121)' title='Exercise videos' subtitle='Exercise videos' icon='film' onPress={() => this.props.navigation.navigate('ExerciseVideos')}/>
        <MenuButton color='rgb(0, 220, 169)' title='Traxivity' subtitle='Traxivity' icon="md-walk" onPress={() => this.props.navigation.navigate('Traxivity')}/>
        <MenuButton color='rgb(15, 206, 224)' title='Useful contacts' subtitle='Useful contacts' icon='md-contacts' onPress={() => this.props.navigation.navigate('UsefulContacts')}/>
        <MenuButton color='rgb(246, 200, 43)' title='Questionnaire' subtitle='Questionnaire' icon="ios-checkbox-outline" onPress={() => this.props.navigation.navigate('Questionnaire')}/>
      </ScrollView>
    );
  }
}