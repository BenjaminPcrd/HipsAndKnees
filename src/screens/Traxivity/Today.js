import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

export default class Today extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: null
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
    GoogleFit.authorize(options).then(res => this._getSteps()).catch(err => console.log(err))

  }

  _getSteps() {
    var start = new Date()
    var end = new Date()
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    const options = {
      startDate: start,
      endDate: end
    };
    
    GoogleFit.getDailyStepCountSamples(options)
     .then((res) => {
         var result = res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps
         this.setState({steps: result[0].value})
     })
     .catch((err) => {console.warn(err)})
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
