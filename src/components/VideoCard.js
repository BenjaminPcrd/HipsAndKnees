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
                <Text>{this.props.title}</Text>
                <Text note>{this.props.subtitle}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image
                style={{
                  alignSelf: "center",
                  resizeMode: "cover",
                  marginVertical: 5,
                  width: deviceWidth / 1.18,
                  height: 150,
                }}
                source={{uri: this.props.image}}
              />
              <Text>{this.props.description}</Text>
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
  
