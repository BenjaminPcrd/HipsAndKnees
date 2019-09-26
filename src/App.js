import React, { Component } from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import MainScreen from "./screens/MainScreen";
import ExerciseVideos from "./screens/ExerciseVideos";
import ExerciseTracking from "./screens/ExerciseTracking";
import UsefulContacts from "./screens/UsefulContacts";
import Questionnaire from "./screens/Questionnaire";

import Today from "./screens/Traxivity/Today";
import Weekly from "./screens/Traxivity/Weekly";
import Monthly from "./screens/Traxivity/Monthly";

const TraxivityTabNavigator = createMaterialTopTabNavigator(
  {
    Today: Today,
    Weekly: Weekly,
    Monthly: Monthly
  },
  {
    navigationOptions: {
      title: "Traxivity"
    },
    tabBarOptions: {
      labelStyle: {
        color: 'black'
      },
      indicatorStyle: {
        backgroundColor: 'green'
      },
      style: {
        backgroundColor: 'white'
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    MainScreen: { screen: MainScreen },
    ExerciseVideos: { screen: ExerciseVideos },
    ExerciseTracking: { screen: ExerciseTracking },
    Traxivity: { screen: TraxivityTabNavigator },
    UsefulContacts: { screen: UsefulContacts },
    Questionnaire: { screen: Questionnaire }
  },
  {
      initialRouteName: "MainScreen",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}