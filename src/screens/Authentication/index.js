import React, { Component } from "react";
import {
  View,
  Text,
  Button
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export default class Authentication extends Component {
  static navigationOptions = {
    title: 'Authentication',
  };

  async _signIn() {
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
    const data = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, 'zRioRfW4SqMzmUJ_EKY1pzzo')
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    console.log(firebaseUserCredential.user._auth._authResult)
    if(firebaseUserCredential.user._auth._authResult) {
      this.props.navigation.navigate('MainScreen')
    }
  }

  render() {
    return (
      <View>
          <Text>
          Authentication
          </Text>
          <GoogleSigninButton
            style={{ width: 200, height: 75 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => this._signIn()}/>
      </View>
    );
  }
}