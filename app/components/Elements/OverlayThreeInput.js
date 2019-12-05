import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Overlay, Icon } from 'react-native-elements'

export default class OverlayThreeInput extends Component {

  constructor(props){
    super(props)

    this.state = {
        ...props,
    }
  }

  onChangeInputOne = inputData => {
    this.setState({
      inputValueOne: inputData
    })
  }

  onChangeInputTwo = inputData => {
    this.setState({
      inputValueTwo: inputData
    })
  }

  onChangeInputThree = inputData => {
    this.setState({
      inputValueThree: inputData
    })
  }

  update = () => {
    const newValueOne = this.state.inputValueOne
    const newValueTwo = this.state.inputValueTwo
    const newValueThree = this.state.inputValueThree

      this.state.updateFunction(newValueOne, newValueTwo, newValueThree)
      this.setState({
          isVisibleOverlay: false
      })
  }

  close = () => {
    this.setState({
        isVisibleOverlay: false
    })

    this.state.updateFunction(null)
  }

  render(){
      const { isVisibleOverlay, placeholderOne, placeholderTwo, inputValueOne, inputValueTwo, inputValueThree , isPassword  } = this.state

    return (
        <Overlay isVisible={isVisibleOverlay} 
                fullScreen={true}
                overlayBackgroundColor='transparent'
                overlayStyle={styles.overlayStyle}>
          <View style={styles.viewOverlay}>
            <Input placeholder={placeholderOne}
                  containerStyle={styles.inputContainer} 
                  onChangeText={value => this.onChangeInputOne(value)}
                  value={inputValueOne}
                  password={isPassword}
                  secureTextEntry={isPassword}
                />
            <Input placeholder={placeholderTwo}
                  containerStyle={styles.inputContainer} 
                  onChangeText={value => this.onChangeInputTwo(value)}
                  value={inputValueTwo}
                  password={isPassword}
                  secureTextEntry={isPassword}
                />
            <Input placeholder={placeholderThree}
                  containerStyle={styles.inputContainer} 
                  onChangeText={value => this.onChangeInputThree(value)}
                  value={inputValueThree}
                  password={isPassword}
                  secureTextEntry={isPassword}
                />
            <Button style={styles.buttonUpdate} title='Update Password' onPress={() => this.update()} />
            <Icon type="material-community" name="close-circle-outline" containerStyle={styles.closeButton} size={30} onPress={() => this.close()} />
          </View>
        </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewOverlay: {
      width: '100%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 2,
      borderColor: '#00a680',
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderTopWidth: 2,
      borderBottomWidth: 2
  },
  inputContainer: {
      marginBottom: 20
  },
  buttonUpdate: {
      backgroundColor: '#00a680'
  },
  closeButton: {
    position: 'absolute',
    right: -16,
    top: -16
  }
  })