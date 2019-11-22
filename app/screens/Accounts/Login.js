import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Button, Image, Text } from 'react-native-elements'

//lib firebase
import * as firebase from 'firebase'

//lib toast
import Toast, { DURATION } from 'react-native-easy-toast'

//lib tcomb
import t from 'tcomb-form-native'
import { LoginStruct, LoginOptions } from '../../forms/LoginForm'
import { log } from 'util'
const Form = t.form.Form

export default class LoginScreen extends Component {

    constructor(){
        super()
        this.state = {
          loginStruct: LoginStruct,
          loginOptions: LoginOptions,
          loginData: {
              email: '',
              password: ''
          },
          loginErrorMessage: ''
      }
    }

login = () => {
    const validate = this.refs.loginForm.getValue()
    console.log(validate)

    if(!validate){
        this.setState({
            loginErrorMessage: 'Invalid Data'
          })
    } else {
        console.log('Logged. :)')
        this.setState({loginErrorMessage: ''})
''
        firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
                .then(resolve => {
                    console.log('logged')
                    this.refs.toastLogin.show('Sign In Successfully', 400, () => {
                        this.props.navigation.goBack()
                    })
                })
                .catch(err => {
                    console.log('invalid login')
                    this.refs.toastLogin.show("There's been a problem, try again.", 2000)
                })
    }
}

onChangeFormLogin = (formValue) => {
    console.log('change')
    this.setState({
      loginData: formValue
    })
    console.log(this.state.loginData)
  }

render(){

    const { loginStruct, loginOptions, loginErrorMessage } = this.state

  return (
    <View style={styles.viewBody}>
      <Image
        source={require('../../../assets/buscomida_logo.png')}
        style={styles.logo}
        containerStyle={styles.containerLogo}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode='contain'
      />
      
      <View style={styles.viewForm}>
        <Form 
          ref="loginForm"
          type={loginStruct}
          options={loginOptions}
          value={this.state.loginData}
          onChange={(formValue) => this.onChangeFormLogin(formValue)}
        />
        <Button title='Login' onPress={() => this.login()}
                buttonStyle={styles.buttonLoginContainer} />

        <Text style={styles.loginErrorMessage}>{ loginErrorMessage }</Text>
      </View>

      <Toast 
        ref="toastLogin"
        position="bottom"
        positionValue={250}
        fadeInDuration={1000}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: '#fff'}}
      />
    </View>
    )
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40
  },
  logo: {
    width: 300,
    height: 150
  },
  containerLogo: {
    alignItems: 'center'
  },
  viewForm:{
    marginTop: 50
  },
  buttonLoginContainer: {
      backgroundColor: '#00a680',
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10
  },
  loginErrorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10

  }
});
