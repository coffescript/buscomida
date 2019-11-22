import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
export default class MyAccount extends Component {

  goToScreen = (nameScreen) => {
    console.log(nameScreen)
    this.props.navigation.navigate(nameScreen)
  }
  
render(){
  return (
    <View style={styles.viewBody}>
      <Text>MyAccount</Text>
      <Button title="Register" onPress={() => this.goToScreen('Register')} />
    </View>
    )
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
