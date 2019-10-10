import React, { Component } from "react";

import {
  Text
} from 'react-native'

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Authentication from './screens/Authentication';
import MainScreen from "./screens/MainScreen";
import ExerciseVideos from "./screens/ExerciseVideos";
import VideoList from "./screens/VideoList"
import UsefulContacts from "./screens/UsefulContacts";
import Questionnaire from "./screens/Questionnaire";

import Today from "./screens/Traxivity/Today";
import Weekly from "./screens/Traxivity/Weekly";
import Monthly from "./screens/Traxivity/Monthly";
import DailyGoal from "./screens/Traxivity/DailyGoal"
import { Button, Icon } from "native-base";

const TraxivityTabNavigator = createMaterialTopTabNavigator(
  {
    Today: Today,
    Weekly: Weekly,
    Monthly: Monthly
  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
      title: "Traxivity",
      headerRight: (<Button transparent onPress={() => navigation.navigate("DailyGoal")}><Icon name="md-settings" style={{color: 'black'}}/></Button>)
    }),
    tabBarOptions: {
      labelStyle: {
        color: 'black'
      },
      indicatorStyle: {
        backgroundColor: 'rgb(0, 220, 169)'
      },
      style: {
        backgroundColor: 'white'
      }
    }
  }
);

const AppStack = createStackNavigator(
  {
    MainScreen: { screen: MainScreen },
    ExerciseVideos: { screen: ExerciseVideos },
    VideoList: { screen: VideoList },
    Traxivity: { screen: TraxivityTabNavigator },
    DailyGoal: { screen: DailyGoal },
    UsefulContacts: { screen: UsefulContacts },
    Questionnaire: { screen: Questionnaire },
  },
  {
      initialRouteName: "MainScreen",
  }
);

const AuthStack = createStackNavigator(
  {
    Authentication: { screen: Authentication }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppStack: AppStack,
      AuthStack: AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
    }
  )
);

export default class Default extends Component {
  render() {
    return <AppContainer />;
  }
}