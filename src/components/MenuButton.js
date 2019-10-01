import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from 'native-base';

export default class MenuButton extends Component {
  render() {
    return (
      <TouchableOpacity style={[styles.container, {backgroundColor: this.props.color}]} activeOpacity={0.5} onPress={this.props.onPress}>
        <View style={styles.textView}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        </View>
        <View style={styles.iconView}>
          <Icon name={this.props.icon} style={{color: 'white', fontSize: 60}}/>
        </View>
        
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 125,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row'
  },
  textView: {
    flex: 2,
    justifyContent: 'center',
    margin: 10
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
  subtitle: {
    color: 'white',
    fontSize: 15
  }
})
