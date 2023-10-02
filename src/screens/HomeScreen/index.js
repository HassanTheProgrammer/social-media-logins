import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomeScreen = ({ route }) => {
  // Access the userInfo parameter from the route
  const userInfo = route.params?.userInfo;
  console.log(userInfo)

  return (
    <View style={styles.container}>
      <Text>User Data</Text>
      {/* <Text>Name: {userInfo?.user.givenName}</Text> */}
      {/* <Text>Email: {userInfo?.user.email}</Text> */}
      {/* Add more fields as needed */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
