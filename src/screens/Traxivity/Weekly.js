import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

import { getSteps, getCals, getDists } from '../../api/googleFitApi'
import TraxivityDataTab from '../../components/TraxivityDataTab'


export default class Weekly extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: [],
      cals: [],
      distances: []
    }
  }

  componentDidMount() {
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

    getSteps(options, res => {
      this.setState({steps: res})
    })

    getCals({...options, basalCalculation: false}, res => {
      this.setState({cals: res})
    })

    getDists(options, res => {
      this.setState({distances: res})
    })
  }

  render() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    var tabStep = this.state.steps.map(x => x.value)
    var stepSum = 0
    var StepAvg = 0
    if (tabStep.length > 0) {
      stepSum = tabStep.reduce(reducer)
      StepAvg = stepSum / tabStep.length
    }

    var tabCal = this.state.cals.map(x => x.calorie)
    var calSum = 0
    if (tabCal.length > 0) {
      calSum = tabCal.reduce(reducer)
    }

    var tabDistance = this.state.distances.map(x => x.distance)
    var distSum = 0
    if (tabDistance.length > 0) {
      distSum = tabDistance.reduce(reducer)/1000
    }

    var data = {
      numBox1: StepAvg,
      textBox1: "Avg Weekly",
      numBox2: stepSum,
      textBox2: "This Week",
      numBox3: calSum,
      textBox3: "Kcal Burned",
      numBox4: distSum,
      textBox4: "Kilometers"
    }

    console.log(this.state)
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>mon: {this.state.steps[0] != null ? this.state.steps[0].value : 0}</Text>
          <Text>tue: {this.state.steps[1] != null ? this.state.steps[1].value : 0}</Text>
          <Text>wed: {this.state.steps[2] != null ? this.state.steps[2].value : 0}</Text>
          <Text>thu: {this.state.steps[3] != null ? this.state.steps[3].value : 0}</Text>
          <Text>fri: {this.state.steps[4] != null ? this.state.steps[4].value : 0}</Text>
          <Text>sat: {this.state.steps[5] != null ? this.state.steps[5].value : 0}</Text>
          <Text>sun: {this.state.steps[6] != null ? this.state.steps[6].value : 0}</Text>
        </View>

        <TraxivityDataTab data={data}/>
      </View>
    );
  }
}