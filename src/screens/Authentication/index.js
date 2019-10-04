import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export default class Authentication extends Component {
  static navigationOptions = {
    title: 'Authentication',
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async _signIn() {
    this.setState({isLoading: true})

    await GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/fitness.location.read",
        "https://www.googleapis.com/auth/fitness.activity.read",
        "https://www.googleapis.com/auth/fitness.body.read"
      ],
      webClientId: '803018449297-k52r7oh2s96n8nbcec7ncf4k6f8ga77a.apps.googleusercontent.com'
    })
    try {
      const data = await GoogleSignin.signIn()
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, 'zRioRfW4SqMzmUJ_EKY1pzzo')
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      if(firebaseUserCredential.user._auth._authResult) {
        this.props.navigation.navigate('MainScreen')
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({isLoading: false})
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

  }

  async componentDidMount() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(isSignedIn) {
      this.props.navigation.navigate('MainScreen')
    } else {
      this.setState({isLoading: false})
    }
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 300, height: 100 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.light}
          onPress={() => this._signIn()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})