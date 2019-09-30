import React, { Component } from "react";
import {
  View,
  Text,
  Button
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit'

export default class Today extends Component {

  componentDidMount() {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ_WRITE,
        Scopes.FITNESS_LOCATION_READ_WRITE
      ],
    }
    GoogleFit.authorize(options).then(res => console.log(res)).catch(err => console.log(err))
  }

  _isEnabled() {
    GoogleFit.isEnabled((err, res) => {
      if(err) {
        console.log(error)
      } else {
        console.log(res)
      }
    })
  }

  _getSteps() {
    const options = {
      startDate: "2017-09-09T00:00:00.000Z", // required ISO8601Timestamp
      endDate: new Date().toISOString() // required ISO8601Timestamp
    };
    
    GoogleFit.getDailyStepCountSamples(options)
     .then((res) => {
         console.log('Daily steps >>> ', res)
     })
     .catch((err) => {console.warn(err)})
  }

  render() {
    return (
      <View>
        <Button title="check isEnabled" onPress={this._isEnabled}/>
        <Button title="get steps" onPress={this._getSteps}/>
      </View>
    );
  }
}