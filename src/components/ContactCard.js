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

export default class ContactCard extends Component {
  render() {
    return (
      <View>
        <Card style={styles.card}>
          <CardItem bordered>
            <Left>
              <Body>
                <Text>{this.props.item.name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
          <Text>{this.props.item.description}</Text>
          </CardItem>
          <CardItem>
            <Text>{this.props.item.number}</Text>
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
  
