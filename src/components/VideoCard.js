import React, { Component } from "react";
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";

import {
    Text,
    Card,
    CardItem,
    Left,
    Body
  } from 'native-base';

import WebView from 'react-native-webview';

export default class VideoCard extends Component {
  render() {
    return (
      <View>
        <Card style={styles.card}>
          <CardItem bordered>
            <Left>
              <Body>
                <Text>{this.props.item.title}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <WebView
              source={{html: '<iframe width="1280" height="720" src="https://www.youtube.com/embed/' + this.props.item.code + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'}}
              style={{height: 200}}
            />
          </CardItem>
          <CardItem>
            <Text>{this.props.item.description}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
});
  
