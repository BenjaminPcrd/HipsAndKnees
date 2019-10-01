import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

import GoogleFit from 'react-native-google-fit'

export default class Weekly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: []
    }
  }

  componentDidMount() {
    this._getSteps()
  }

  _getSteps() {
    var start = new Date()
    var end = new Date()
    var nbDays = start.getDay();
    if(nbDays == 0) nbDays = 7
    start.setDate(start.getDate() - (nbDays-1))
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    const options = {
      startDate: start,
      endDate: end
    };
    
    GoogleFit.getDailyStepCountSamples(options)
     .then((res) => {
         var result = res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps
         console.log(result)
         this.setState({steps: result})
     })
     .catch((err) => {console.warn(err)})
  }

  render() {
    console.log(this.state)
    return (
      <View>
          <Text>mon: {this.state.steps[0] != null ? this.state.steps[0].value : 0}</Text>
          <Text>tue: {this.state.steps[1] != null ? this.state.steps[1].value : 0}</Text>
          <Text>wed: {this.state.steps[2] != null ? this.state.steps[2].value : 0}</Text>
          <Text>thu: {this.state.steps[3] != null ? this.state.steps[3].value : 0}</Text>
          <Text>fri: {this.state.steps[4] != null ? this.state.steps[4].value : 0}</Text>
          <Text>sat: {this.state.steps[5] != null ? this.state.steps[5].value : 0}</Text>
          <Text>sun: {this.state.steps[6] != null ? this.state.steps[6].value : 0}</Text>
      </View>
    );
  }
}