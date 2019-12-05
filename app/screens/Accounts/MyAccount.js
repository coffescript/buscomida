import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

//lib firebase
import * as firebase from 'firebase'

//components
import AccountGuest from '../../components/myAccount/myAccountGuest'
import AccountUser from '../../components/myAccount/MyAccountUser'

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
    this.props.navigation.navigate(nameScreen)
  }

  logout = () => {
    console.log('Sign Out')
    firebase.auth().signOut()
  }
  
render(){

  const { login } = this.state

  if(!login){
    return <AccountGuest goToScreen={this.goToScreen} />
  } else{
    return (
      <AccountUser />
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
