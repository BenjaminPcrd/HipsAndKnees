import React, { Component } from "react";
import {
    View,
    StyleSheet
} from 'react-native';

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
              <Body style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.props.item.title}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <WebView
              source={{html: '<iframe frameborder="0" allowfullscreen width="100%" height="100%" src="https://www.youtube.com/embed/' + this.props.item.code + '"></iframe>'}}
              style={{height: 200}}
            />
          </CardItem>
          <CardItem>
            <Text style={{color: 'grey', fontSize: 14}}>{this.props.item.description}</Text>
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
  
