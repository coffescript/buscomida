import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Overlay, Icon } from 'react-native-elements'

export default class OverlayOneInput extends Component {

  constructor(props){
    super(props)

    this.state = {
        ...props,
    }
  }

  onChangeInput = inputData => {
    this.setState({
      inputValue: inputData
    })
  }

  update = () => {
      const newValue = this.state.inputValue

      this.state.updateFunction(newValue)
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
      const { isVisibleOverlay, placeholder, inputValue } = this.state

    return (
        <Overlay isVisible={isVisibleOverlay} 
                fullScreen={true}
                overlayBackgroundColor='transparent'
                overlayStyle={styles.overlayStyle}>
          <View style={styles.viewOverlay}>
            <Input placeholder={placeholder}
                  containerStyle={styles.inputContainer} 
                  onChangeText={value => this.onChangeInput(value)}
                  value={inputValue}
                />
                  
            <Button style={styles.buttonUpdate} title='Update' onPress={() => this.update()} />
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