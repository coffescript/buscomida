import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Button, Image, Text, Divider } from 'react-native-elements'

const icon = require('../../../assets/img/myaccountguest.jpg')

export default class AccountGuest extends Component {

    constructor(props){
        super(props)
    }


render(){

    const { goToScreen } = this.props
  return (
      <View style={styles.viewBody}>
        <Image 
          source={icon}
          style={styles.image}
          containerStyle={styles.containerLogo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode='contain'
        />
        <Text style={styles.title}>Consult your profile of Buscomida</Text>
        <Text style={styles.description}>
            ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores
            restaurantes de una forma sencilla, vota cual te ha gustado más y 
            comenta como ha sido tu experiencia.
        </Text>
        <Button buttonStyle={styles.btnViewProfile} 
                title='Show your profile'
                onPress={() => goToScreen('Login')} />
      </View>
     )
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    height: 300,
    marginBottom: 40
  },
  containerLogo: {
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 40
  },
  description:{
    textAlign: 'center',
    marginBottom: 10
  },
  btnViewProfile: {
      backgroundColor: '#00a680',
      marginBottom: 20
  }
})