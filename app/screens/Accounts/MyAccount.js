import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

//lib firebase
import * as firebase from 'firebase'

//components
import AccountGuest from '../../components/myAccount/myAccountGuest'

export default class MyAccount extends Component {

  constructor(){
    super()
    this.state = {
      login: false
    }
  }

  async componentDidMount(){
    await firebase.auth().onAuthStateChanged(user => { 
      if(user){
        this.setState({
          login: true
        })
      } else {
        this.setState({
          login: false
        })
      }
    })
  }
  
  goToScreen = (nameScreen) => {
    console.log(nameScreen)
    this.props.navigation.navigate(nameScreen)
  }

  logout = () => {
    console.log('Sign Out')
    firebase.auth().signOut()
  }
  
render(){

  const { login } = this.state

  if(login){
    return (
    <View style={styles.viewBody}>
      <Text>Are you Logged Successfully</Text>
      <Button title='Sign out' onPress={() => this.logout()} />
    </View>
    )
  } else{
    return (
      <AccountGuest goToScreen={this.goToScreen} />
      )
    }
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
