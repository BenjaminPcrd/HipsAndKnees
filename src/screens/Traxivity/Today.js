import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

import { getSteps, getCals, getDists } from '../../api/googleFitApi'
import TraxivityDataTab from '../../components/TraxivityDataTab'
import Chart from '../../components/Chart'
import { ScrollView } from "react-native-gesture-handler";
import ProgressCircle from 'react-native-progress-circle'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

console.disableYellowBox = true;
export default class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: 0,
      cals: 0,
      dists: 0,
      goal: 5000
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
    var progress = this.state.steps > this.state.goal ? 100 : Math.round((this.state.steps*100)/this.state.goal)
    var BoxData = {
      numBox1: this.state.goal,
      textBox1: "Daily Goal",
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
      <ScrollView style={{flex: 1}}>
        <View style={{height: screenHeight/1.3}}>
          <TraxivityDataTab data={BoxData}/>
          <Chart tabStep={this.tab} formatter={formatter} granularity={4}/>
        </View>
        <View style={{alignItems: 'center', margin: 10}}>
          <ProgressCircle
            percent={progress}
            radius={(screenWidth/3)}
            borderWidth={20}
            color="rgb(0, 220, 169)"
            bgColor="rgb(255, 255, 255)"
            shadowColor="rgb(200, 200, 200)"
          >
            <Text style={{ fontSize: 18 }}>{progress + " %"}</Text>
            <Text style={{ fontSize: 18 }}>of Daily Goal</Text>
          </ProgressCircle>
        </View>
        
      </ScrollView>
    );
  }
}

