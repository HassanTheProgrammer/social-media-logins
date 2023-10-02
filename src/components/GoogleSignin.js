import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SCREENS} from '../constants/Navigation';
import {useNavigation} from '@react-navigation/native';

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();
  // console.log(`**************************** ${userInfo} **************************`)

  // Use Effect
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  // Google Login
  const GOOGLE_LOGIN = async () => {
    try {
      // Check if a sign-in operation is already in progress
      const isSignInInProgress = await GoogleSignin.isSignedIn();
      if (isSignInInProgress) {
        console.log('Sign-in is already in progress.');
        return;
      }

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("*************** START **************")
      setUserInfo(userInfo);
      console.log("*************** End **************")

      // Navigate to the home screen after successful sign-in
      navigation.replace(SCREENS.home, {userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g., sign-in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
        console.log(error);
      } else {
        // Some other error happened
        console.error(error);
      }
    }
  };

  // Check if the user is already signed in when the component mounts
  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          // User is already signed in, navigate to home screen
          navigation.replace(SCREENS.home, {userInfo});
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkSignInStatus();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GOOGLE_LOGIN} style={styles.googleButton}>
        <Text style={styles.text}>SignIn With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
