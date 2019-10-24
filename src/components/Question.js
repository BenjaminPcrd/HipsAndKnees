import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    View,
    CheckBox,
    FlatList
} from 'react-native';
import { TextInput } from "react-native-gesture-handler";

export default class MenuButton extends Component {
  state = {
    checkboxes: []
  }

  componentDidMount() {
    if(this.props.item.type == "MULTIPLE_CHOICE_SINGLE_ANSWER" || this.props.item.type == "MULTIPLE_CHOICE_MULTIPLE_ANSWER") {
      const state = this.props.item.answers.map((x, i) => {
        return {id: i, checked: false}
      })
      this.setState({checkboxes: state})
    } else if (this.props.item.type == "TRUE_FALSE") {
      this.setState({
        checkboxes: [{id: 0, checked: false}, {id: 1, checked: false}]
      })
    }
  }

  _isChecked(index) {
    const cb = this.state.checkboxes.find(cb => cb.id == index)
    if(cb) {
      return cb.checked
    }
    return false
  }

  _toggleCheckbox(index) {
    const checkboxes = this.state.checkboxes
    checkboxes.map(x => {
      if(x.id == index) {
        x.checked ? x.checked = false : x.checked = true
      } else if(this.props.item.type == "MULTIPLE_CHOICE_SINGLE_ANSWER" || this.props.item.type == "TRUE_FALSE") {
        x.checked = false
      }
    })
    this.setState({ checkboxes })
    this._onChange(index)
  }

  _onChange(answer) {
    this.props.onChange(answer)
  }

  _renderAnswer() {
    switch(this.props.item.type) {
      case "MULTIPLE_CHOICE_SINGLE_ANSWER":
        return (
          <FlatList 
            data={this.props.item.answers}
            renderItem={({ item, index }) => <View style={styles.checkboxView}><CheckBox value={this._isChecked(index)} onValueChange={() => this._toggleCheckbox(index)}/><Text>{item}</Text></View>}
            keyExtractor={item => item}
          />
        )
      case "MULTIPLE_CHOICE_MULTIPLE_ANSWER":
          return (
            <FlatList 
              data={this.props.item.answers}
              renderItem={({ item, index }) => <View style={styles.checkboxView}><CheckBox value={this._isChecked(index)} onValueChange={() => this._toggleCheckbox(index)}/><Text>{item}</Text></View>}
              keyExtractor={item => item}
            />
          )
      case "TRUE_FALSE":
        return (
          <View>
            <View style={styles.checkboxView}><CheckBox value={this._isChecked(1)} onValueChange={() => this._toggleCheckbox(1)}/><Text>Yes</Text></View>
            <View style={styles.checkboxView}><CheckBox value={this._isChecked(0)} onValueChange={() => this._toggleCheckbox(0)}/><Text>No</Text></View>
          </View>
        )
      case "SHORT_ANSWER":
        return (
          <TextInput style={styles.textInput} placeholder="Your answer" onChangeText={text => this._onChange(text)}/>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.infos}>{this.props.item.infos}</Text>
        <Text style={styles.quesion}>{this.props.item.question}</Text>
        {this._renderAnswer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2
  },
  infos: {
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  quesion: {
    fontSize: 20
  },
  checkboxView: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#DDDDDD',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5
  }
})
/*<View style={styles.checkboxView}><CheckBox value={this.state.checked[0]} onValueChange={() => this.setState({checked: [!this.state.checked[0], false, false, false, false]}, () => this.props.onChange(this.state.checked[0] ? this.props.item.answers[0] : null))}/><Text>{this.props.item.answers[0]}</Text></View>
        <View style={styles.checkboxView}><CheckBox value={this.state.checked[1]} onValueChange={() => this.setState({checked: [false, !this.state.checked[1], false, false, false]}, () => this.props.onChange(this.state.checked[1] ? this.props.item.answers[1] : null))}/><Text>{this.props.item.answers[1]}</Text></View>
        <View style={styles.checkboxView}><CheckBox value={this.state.checked[2]} onValueChange={() => this.setState({checked: [false, false, !this.state.checked[2], false, false]}, () => this.props.onChange(this.state.checked[2] ? this.props.item.answers[2] : null))}/><Text>{this.props.item.answers[2]}</Text></View>
        <View style={styles.checkboxView}><CheckBox value={this.state.checked[3]} onValueChange={() => this.setState({checked: [false, false, false, !this.state.checked[3], false]}, () => this.props.onChange(this.state.checked[3] ? this.props.item.answers[3] : null))}/><Text>{this.props.item.answers[3]}</Text></View>
        <View style={styles.checkboxView}><CheckBox value={this.state.checked[4]} onValueChange={() => this.setState({checked: [false, false, false, false, !this.state.checked[4]]}, () => this.props.onChange(this.state.checked[4] ? this.props.item.answers[4] : null))}/><Text>{this.props.item.answers[4]}</Text></View>*/