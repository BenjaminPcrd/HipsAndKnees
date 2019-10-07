import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    processColor
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';

export default class Chart extends Component {
  render() {
    //values: this.props.tabStep ? this.props.tabStep.map(item => item.value) : [],
    const data = {
      dataSets: [{
        values: [1235, 253, 2565, 1235],
        label: 'Number of steps',
        config: {
          color: processColor('rgba(0, 220, 169, 0.9)')
        }
      }],
      config: {
        barWidth: 0.8
      }
    }

    const yAxis = {
      left: {enabled: false,},
      right: {
        enabled: true,
        drawAxisLine: true,
        axisLineWidth: 2,
        axisLineColor: processColor('rgb(0, 0, 0)'),
        textSize: 15,
        spaceBottom: 10
      }
    }

    const xAxis = {
      position: "BOTTOM",
      valueFormatter: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      drawGridLines: false,
      drawAxisLine: true,
      axisLineWidth: 2,
      axisLineColor: processColor('rgb(0, 0, 0)'),
      textSize: 15,
      granularityEnabled: true,
      granularity : 1,
    }

    return (
      <BarChart
        style={{flex: 1, marginTop: 10, marginBottom: 10, marginRight: 10}}
        data={data}
        yAxis={yAxis}
        xAxis={xAxis}
        chartDescription={{text: ''}}
        legend={{enabled: false}}
        visibleRange={{x: { min: 7 }}}
        touchEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
