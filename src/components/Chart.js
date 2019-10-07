import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

export default class Chart extends Component {
  render() {
    return (
      <BarChart 
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
