import React, { Component } from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Authentication from './screens/Authentication';
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

const AppStack = createStackNavigator(
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

const AuthStack = createStackNavigator(
  {
    Authentication: { screen: Authentication }
  }
);

/*const prevGetStateForAction = AppNavigator.router.getStateForAction;

AppNavigator.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Home
  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'MainScreen') {
    return null;
  }

  // Do not allow to go back to Login
  if (action.type === 'Navigation/BACK' && state) {
    const newRoutes = state.routes.filter(r => r.routeName !== 'Authentication');
    const newIndex = newRoutes.length - 1;
    return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
  }
  return prevGetStateForAction(action, state);
};*/

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