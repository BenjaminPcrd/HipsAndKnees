import React, { Component } from "react";
import {
  View,
  Text,
  Picker 
} from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";

export default class DailyGoal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Set the daily goal',
      headerLeft:(<HeaderBackButton onPress={navigation.getParam('goBackWithGoal')}/>)
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      goal: 5000
    }

    this.items = []
    for(var i = 3000; i < 100000; i += 500) {
      this.items.push(i)
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({goBackWithGoal: this._goBackWithGoal})
  }

  _goBackWithGoal = () => {
    this.props.navigation.navigate("Today", {goal: this.state.goal})
  }

  render() {
    return (
      <View>
        <Picker 
          style={{width: 200, height: 50}}
          selectedValue={this.state.goal}
          prompt={"Daily goal"}
          onValueChange={(value) => this.setState({goal: value})}
        >
          {
            this.items.map((item) => {
              return (<Picker.Item label={item.toString()} value={item} key={item}/>)
            })
          }
        </Picker>
      </View>
    );
  }
}
