import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as firebase from 'firebase'
import * as Google from 'expo-google-app-auth';
import { firebaseConfig } from './config/config'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Deprecated: Native Google Sign-In has been moved to Expo.GoogleSignIn (\'expo-google-sign-in\') Falling back to `web` behavior. `behavior` deprecated in SDK 34'])

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app()
  }
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: "83160479476-t0ajeas3b2p403a7o4h5u1ver42cj06q.apps.googleusercontent.com",
        iosClientId: "83160479476-75021rn5andmc1atknqvdm81064omqkj.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        const idToken = result.idToken
        const name = result.user.name
        const email = result.user.email
        console.log(idToken, name, email)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={() => signInWithGoogleAsync()} title="Google Login"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
