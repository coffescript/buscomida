import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Button, Image, Text, Divider } from 'react-native-elements'

// sub components
import UserInfo from './userInfo'

export default class AccountUser extends Component {

    constructor(props){
        super(props)
    }

render(){
  return (
      <View style={styles.viewBody}>
        <UserInfo />
      </View>
     )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    height: '100%',
    backgroundColor: '#f2f2f2'
  }
})