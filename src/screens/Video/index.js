import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import WebView from 'react-native-webview';

export default class Video extends Component {
  static navigationOptions = {
    title: 'Video',
  };

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{this.props.navigation.getParam('item').title}</Text>
          <Text>{this.props.navigation.getParam('item').subtitle}</Text>
        </View>
        <WebView
          source={{html: '<iframe width="1280" height="720" src="' + this.props.navigation.getParam('item').url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'}}
          style={styles.webView}
        />
        <View style={styles.descriptionView}>
          <Text>
          {this.props.navigation.getParam('item').description}</Text>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleView: {
    flex: 0,
    margin: 10,
    alignItems: 'center'
  },
  webView: {
    flex: 1,
    margin: 10
  },
  descriptionView: {
    flex: 1,
    margin: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});

