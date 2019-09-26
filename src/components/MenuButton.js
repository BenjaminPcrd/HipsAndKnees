import React, { Component } from "react";
import {
    Text,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MenuButton extends Component {
  render() {
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: this.props.color}]} activeOpacity={0.5} onPress={this.props.onPress}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    subtitle: {
        color: 'white',
        fontSize: 20
    }
})
