import React, { Component } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Dimensions
} from 'react-native';
import { HeaderBackButton } from "react-navigation-stack";
import { Button, Icon,Text } from "native-base";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class DailyGoal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Set the daily goal',
      headerLeft:(<HeaderBackButton onPress={navigation.getParam('goBackWithGoal')}/>)
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      goal: 5000
    }

    this.items = []
    for(var i = 3000; i < 100000; i += 500) {
      this.items.push(i)
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({goBackWithGoal: this._goBackWithGoal})
  }

  _goBackWithGoal = () => {
    this.props.navigation.navigate("Today", {goal: this.state.goal})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.text}>Your daily goal:</Text>
          <Picker 
            style={styles.picker}
            selectedValue={this.state.goal}
            prompt={"Daily goal"}
            onValueChange={(value) => this.setState({goal: value})}
          >
            {
              this.items.map((item) => {
                return (<Picker.Item label={item.toString()} value={item} key={item}/>)
              })
            }
          </Picker>
        </View>
        <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
          <Button onPress={() => this.props.navigation.goBack()}><Text>Cancel</Text></Button>
          <Button onPress={() => this._goBackWithGoal()}><Text>Ok</Text></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    width: (screenWidth/2)-5,
    marginTop: 10
  },
  picker: {
    width: (screenWidth/2)-5
  }
})
