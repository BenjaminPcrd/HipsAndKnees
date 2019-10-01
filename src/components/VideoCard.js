import React, { Component } from "react";
import {
    Image,
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

const deviceWidth = Dimensions.get('window').width

export default class VideoCard extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.5} >
        <Card style={styles.card}>
          <CardItem bordered>
            <Left>
              <Body>
                <Text>{this.props.item.title}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image
                style={{
                  alignSelf: "center",
                  resizeMode: "contain",
                  width: deviceWidth / 1.18,
                  height: 180,
                }}
                source={{uri: "http://img.youtube.com/vi/" + this.props.item.code + "/mqdefault.jpg"}}
              />
              <Text>{this.props.item.description}</Text>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
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
  
