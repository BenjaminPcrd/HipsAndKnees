import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

import { getSteps, getCals, getDists } from '../../api/googleFitApi'

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
      this.setState({ cals: res.calorie })
    })

    getDists(options, res => {
      this.setState({ dists: res.distance })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.steps}</Text>
        <Text>steps</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 50
  }
});
