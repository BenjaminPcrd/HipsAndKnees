import React, { Component } from "react";
import {
  View
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

import { getSteps, getCals, getDists } from '../../api/googleFitApi'
import TraxivityDataTab from '../../components/TraxivityDataTab'
import Chart from '../../components/Chart'

console.disableYellowBox = true;
export default class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: null,
      cals: null,
      dists: null,
      goal: null
    }
    this.tab = []
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

    this.props.navigation.addListener('didFocus', () => {
      this.setState({goal: this.props.navigation.getParam('goal', 5000)}) 
    })
  }

  async _getData() {
    var start = new Date()
    var end = new Date()
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    const options = {
      startDate: start,
      endDate: end
    };

    getSteps(options, null, res => {
      this.setState({ steps: res[0].value})
    })

    getCals({...options, basalCalculation: false}, res => {
      this.setState({ cals: res[0].calorie })
    })

    getDists(options, res => {
      this.setState({ dists: res[0].distance })
    })

    for(i = 0; i < 24; i++) {
      start.setHours(i, 0, 0, 0)
      end.setHours(i, 59, 59, 999)
      var optionsTab = {
        startDate: start,
        endDate: end
      };
      getSteps(optionsTab, i, (res, index) => {
        this.tab[index] = res.length > 0 ? res[0] : {date: "", value: 0}
        if(index == 23) {
          this.forceUpdate()
        }
      })
      
    }
  }

  render() {
    console.log(this.state.goal)
    var BoxData = {
      numBox1: this.state.steps > this.state.goal ? "100" : Math.round((this.state.steps*100)/this.state.goal),
      textBox1: "% Of Daily Goal",
      numBox2: this.state.steps,
      textBox2: "Steps Today",  
      numBox3: this.state.cals,
      textBox3: "Kcal burned",
      numBox4: this.state.dists/1000,
      textBox4: "Kilometers"
    }

    var formatter = [];
    for (var i = 0; i < 24; i++) {
      formatter.push(i.toString());
    }

    return (
      <View style={{flex: 1}}>
        <Chart tabStep={this.tab} formatter={formatter} granularity={4}/>
        <TraxivityDataTab data={BoxData}/>
      </View>
    );
  }
}

