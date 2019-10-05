import React, { Component } from "react";
import {
  View,
  Text
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

import { getSteps, getCals, getDists } from '../../api/googleFitApi'
import TraxivityDataTab from '../../components/TraxivityDataTab'

export default class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: null,
      cals: null,
      dists: null
    }
  }

  componentDidMount() {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ_WRITE,
        Scopes.FITNESS_LOCATION_READ_WRITE
      ],
    }
    GoogleFit.authorize(options).then(res => this._getData()).catch(err => console.log(err))

  }

  _getData() {
    var start = new Date()
    var end = new Date()
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    const options = {
      startDate: start,
      endDate: end
    };

    getSteps(options, res => {
      this.setState({ steps: res[0].value})
    })

    getCals({...options, basalCalculation: false}, res => {
      this.setState({ cals: res[0].calorie })
    })

    getDists(options, res => {
      this.setState({ dists: res[0].distance })
    })
  }

  render() {
    var data = {
      numBox1: 0,
      textBox1: "Of Daily Goal",
      numBox2: this.state.steps,
      textBox2: "Steps Today",
      numBox3: this.state.cals,
      textBox3: "Kcal burned",
      numBox4: this.state.dists/1000,
      textBox4: "Kilometers"
    }

    return (
      <View style={{flex: 1}}>
        <Text style={{flex: 1}}>{this.state.steps}</Text>
        <TraxivityDataTab data={data}/>
      </View>
    );
  }
}

