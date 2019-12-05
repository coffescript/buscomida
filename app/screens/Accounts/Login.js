import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Button, Image, Text, SocialIcon, Divider } from 'react-native-elements'

//lib firebase
import * as firebase from 'firebase'

//configuration facebook app
import { FacebookAPI } from '../../utils/FacebookLogin'
import * as Facebook from 'expo-facebook'

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

loginFacebook = async () => {
    console.log('Login Facebook....')
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FacebookAPI.application_id,
            {permissions: FacebookAPI.permissions }
        )

    if(type == 'success'){
        const credentials = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInWithCredential(credentials)
            .then( () => {
                this.refs.toastLogin.show('Login Successfully', 100, () => {
                    this.props.navigation.goBack()
                })
            })
            .catch(err => {
                this.refs.toastLogin.show('Error Sign In with Facebook, try again later', 300)
            })
    } else if(type == 'cancel') {
        this.refs.toastLogin.show('Sign In Cancelled', 300)
    } else {
        this.refs.toastLogin.show('Error Unknown, try again later', 300)
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
      {/*<Image
        source={require('../../../assets/img/buscomida_logo.png')}
        style={styles.logo}
        containerStyle={styles.containerLogo}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode='contain'
      />*/}
      
      <View style={styles.viewForm}>
        <Form 
          ref="loginForm"
          type={loginStruct}
          options={loginOptions}
          value={this.state.loginData}
          onChange={(formValue) => this.onChangeFormLogin(formValue)}
        />
        <Button title='Login' onPress={() => this.login()}
                buttonStyle={styles.buttonLoginContainer} 
          />

        <Text style={styles.textRegister}>
          Not Registered Yet? <Text style={styles.btnRegister} onPress={() => this.props.navigation.navigate('Register')}>Sign Up</Text>
        </Text>

        <Text style={styles.loginErrorMessage}>{ loginErrorMessage }</Text>

        <Divider style={styles.divider} />

        <SocialIcon 
          title="Sign In With Facebook" 
          button type="facebook"
          onPress={() => this.loginFacebook()} />
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
    marginLeft: 30,
    marginRight: 30,
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
    marginTop: 10,
    marginBottom: 10

  },
  divider: {
      backgroundColor: '#00a680',
      marginBottom: 20
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
      color: '#00a680',
      fontWeight: 'bold'
  }
});
