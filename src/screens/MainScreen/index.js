import React, { Component } from "react";
import {
  ScrollView,
  Alert
} from 'react-native';
import { Icon, Button } from 'native-base';
import MenuButton from "../../components/MenuButton"
import { GoogleSignin } from 'react-native-google-signin'

export default class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Hips And Knees',
      headerRight: (
        <Button transparent onPress={() => {
          Alert.alert('Log out', 'Do you want to log out?', [
            {text: 'Cancel',style: 'cancel'},
            {text: 'YES', onPress: async () => {
              await GoogleSignin.configure()
              await GoogleSignin.signOut()
              navigation.navigate('Authentication')
            }}
          ])
        }}><Icon name="md-log-out" style={{color: 'black'}}/></Button>
      ),
    };
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