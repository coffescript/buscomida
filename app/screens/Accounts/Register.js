import React, { Component } from "react"
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements'

//lib firebase
import * as firebase from 'firebase'

//lib toast
import Toast, { DURATION } from 'react-native-easy-toast'

//lib tcomb
import t from 'tcomb-form-native'
import { RegisterStruct, RegisterOptions } from '../../forms/RegisterForm'
const Form = t.form.Form



export default class RegisterScreen extends Component {

  constructor(){
    super()
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      formErrorMessage: ''
    }
  }

  register = () => {
  
    const { password, passwordConfirmation } = this.state.formData

    if( password === passwordConfirmation ) {
      console.log('secure pass!')
      const validate = this.refs.registerForm.getValue()

      if(validate){
        console.log('Register Successfully')
        this.setState({ formErrorMessage: '' })
        firebase.auth()
        .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(resolve => {
            this.refs.toastRegister.show('Register Successfully', 400, () => {
              this.props.navigation.goBack()
            })
          })
          .catch(err => {
            this.refs.toastRegister.show('Email is already in use', 2000)
          })
          
      } else {
        this.setState({
          formErrorMessage: 'Register Unsuccessfully'
        })

      }
      console.log(validate)
      console.log(this.state.formData)

    }else {
      this.setState({
        formErrorMessage: 'Invalid Password'
      })
    }
  }

  onChangeFormRegister = (formValue) => {
    console.log('change')
    this.setState({
      formData: formValue
    })
    console.log(this.state.formData)
  }

render(){

  const { registerStruct, registerOptions, formErrorMessage } = this.state

  return (
    <View style={styles.viewBody}>
      <Form 
        ref="registerForm"
        type={registerStruct}
        options={registerOptions}
        value={this.state.formData}
        onChange={(formValue) => this.onChangeFormRegister(formValue)}
      />
      <Button title="Sign up" onPress={() => this.register()}
              buttonStyle={styles.btnJoinContainer} 
      />
      <Text style={styles.formErrorMessage}>{ formErrorMessage }</Text>
       <Toast 
         ref="toastRegister"
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
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40

  },
  btnJoinContainer: {
    backgroundColor: '#00a680',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  formErrorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 30

  }
})
