import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';

import { getSteps, getCals, getDists } from '../../api/googleFitApi'
import TraxivityDataTab from '../../components/TraxivityDataTab'
import Chart from '../../components/Chart'

export default class Monthly extends Component {
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
    start.setDate(1)
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
      textBox1: "Avg Monthly",
      numBox2: stepSum,
      textBox2: "This Month",
      numBox3: calSum,
      textBox3: "Kcal Burned",
      numBox4: distSum,
      textBox4: "Kilometers"
    }

    return (
      <View style={{flex: 1}}>
        
        <TraxivityDataTab data={data}/>
      </View>
    );
  }
}