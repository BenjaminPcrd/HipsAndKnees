import React, { Component } from "react";
import {
  View,
  Text,
  Picker 
} from 'react-native';

export default class DailyGoal extends Component {
  static navigationOptions = {
    title: 'Set the daily goal  ',
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
