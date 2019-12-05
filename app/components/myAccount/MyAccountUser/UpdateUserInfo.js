import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Button, Image, Text, Divider, ListItem } from 'react-native-elements'

//sub components
//import menuConfig from './menuConfig'
import OverlayOneInput from '../../Elements/OverlayOneInput'
import OverlayTwoInput from '../../Elements/OverlayTwoInput'
import OverlayThreeInput from '../../Elements/OverlayThreeInput'

//toast
import Toast, { DURATION } from 'react-native-easy-toast'


export default class UpdateUserInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
        ...props,
        overlayComponent: null,
        menuItems: [
            {
                title: 'Change Name and Last Name',
                iconType: 'material-community',
                iconNameRight: 'chevron-right',
                iconColorRight: '#ccc',
                iconNameLeft: 'account-circle',
                iconColorLeft: '#ccc',
                onPress: () => this.openOverlay('Name and Last Name', this.updateUserDisplayName, props.userInfo.displayName)
                
            },
            {
                title: 'Change Email',
                iconType: 'material-community',
                iconNameRight: 'chevron-right',
                iconColorRight: '#ccc',
                iconNameLeft: 'at',
                iconColorLeft: '#ccc',
                onPress: () => this.openOverlayTwo('Email', 'Password', props.userInfo.email, this.updateUserEmail)
                
            },
            {
                title: 'Change Password',
                iconType: 'material-community',
                iconNameRight: 'chevron-right',
                iconColorRight: '#ccc',
                iconNameLeft: 'lock-reset',
                iconColorLeft: '#ccc',
                onPress: () => this.openOverlayThree('Current Password', 'New Password', 'Repeat Password', this.updateUserPassword)
                
            }
        ]
    }
  }

  updateUserDisplayName = async (newDisplayName) => {

    if(newDisplayName){
      this.state.updateUserDisplayName(newDisplayName)
    }

    this.setState({
        overlayComponent: null
    })
  }

  openOverlay = (placeholder, updateFunction, inputValue) => {
    this.setState({
        overlayComponent: (
            <OverlayOneInput
              isVisibleOverlay={true}
              placeholder={placeholder}
              updateFunction={updateFunction}
              inputValue={inputValue}
            />)
    })
  }

  updateUserEmail = async (newEmail, password) => {
    const emailOld = this.props.userInfo.email

    if(emailOld != newEmail && password){
      this.state.updateUserEmail(newEmail, password)
    }

    this.setState({
        overlayComponent: null
    })
  }

  openOverlayTwo = (placeholderOne, placeholderTwo, inputValueOne, inputValueTwo, updateFunction) => {
    this.setState({
        overlayComponent: (
            <OverlayTwoInput
              isVisibleOverlay={true}
              placeholderOne={placeholderOne}
              placeholderTwo={placeholderTwo}
              inputValueOne={inputValueOne}
              inputValueTwo={inputValueTwo}
              isPassword={true}
              updateFunction={updateFunction}
            />)
    })
  }

  updateUserPassword = async (currentPassword, newPassword, confirmPassword) => {

    if(currentPassword && newPassword && repeatPassword) {
        if(newPassword && repeatPassword){
            if(currentPassword === newPassword){
                this.refs.toast.show('write another password')
            } else {
                this.state.updateUserPassword(currentPassword, newPassword)
            }
        } else {
            this.refs.toast.show('the password need be equal')
        }
    } else {
        this.refs.toast.show('Complete all inputs')
    }

    this.setState({
        overlayComponent: null
    })


  }

  openOverlayThree = (placeholderOne, placeholderTwo, placeholderThree, updateFunction) => {
    this.setState({
        overlayComponent: (
            <OverlayThreeInput
              isVisibleOverlay={true}
              placeholderOne={placeholderOne}
              placeholderTwo={placeholderTwo}
              placeholderThree={placeholderThree}
              inputValueOne=''
              inputValueTwo=''
              inputValueThree=''
              isPassword={true}
              updateFunction={updateFunction}

            />)
    })
  }


render(){
    const { menuItems, overlayComponent } = this.state

  return(
      <View style={styles.viewUpdateUserInfo}>
        {
            menuItems.map((item, index) => (
                <ListItem 
                  key={index}
                  title={item.title}
                  leftIcon={{ 
                      type: item.iconType,
                      name: item.iconNameLeft,
                      color: item.iconColorLeft
                    }}
                  rightIcon={{ 
                      type: item.iconType,
                      name: item.iconNameRight,
                      color: item.iconColorRight
                    }}
                  onPress={item.onPress}
                  containerStyle={styles.contentContainerStyle}
                />
            ))
        }
        {overlayComponent}
        <Toast
          ref='toast'
          position='bottom'
          positionValue={0}
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
    viewUpdateUserInfo: {
      
    },
    contentContainerStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3d3d3'
    }
  })