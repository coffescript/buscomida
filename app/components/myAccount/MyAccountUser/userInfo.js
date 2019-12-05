import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Button } from 'react-native-elements'

//firebase
import * as firebase from 'firebase'

//change avatar
import { Permissions, ImagePicker } from 'expo'

//toast
import Toast, { DURATION } from 'react-native-easy-toast'

// sub components
import UpdateUserInfo from './UpdateUserInfo'

export default class UserInfo extends Component {
  constructor(props){
      super(props)
      this.state = {
        ...props,
        userInfo: {

        }
      }
  }

  componentDidMount = async () => {
      await this.getUserInfo()
  }

  async getUserInfo(){
      const user = await firebase.auth().currentUser

      await user.providerData.forEach(userInfo => {
          this.setState({
              userInfo
          })
      })
  }

  reauthenticate = currentPassword => {
    const user = firebase.auth.currentUser
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword
    )

    return user.reauthenticateWithCredential(credentials)
  }

  checkUserAvatar = photoURL => {
      return photoURL ? photoURL : 'https://api.adorable.io/avatars/285/abott@adorable.png'
  }

  updateUserDisplayName = async newDisplayName => {
    const update = {
        displayName: newDisplayName
    }

    await firebase.auth().currentUser.updateProfile(update)

    this.getUserInfo()
  }

  updateUserEmail = async (newEmail, password) => {
    this.reauthenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser

        user.updateEmail(newEmail)
          .then(() => {
            console.log('Email Changed Successfully')
            this.refs.toast.show('Email Changed Successfully', 50, () => {
              firebase.auth().signOut()
            })
          }).catch(err => {
              console.log(err)
              this.refs.toast.show(err, 1500)
          }).catch(err => {
              console.log('Password Incorrect')
              this.refs.toast.show('Password Incorrect', 1500)
          })
        })
    }

  updateUserPassword = async (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
        .then(() => {
          const user = firebase.auth().currentUser
          user.updatePassword(newPassword)
            .then(() => {
              this.refs.toast.show('Password is Update Successfully', 50, () => {
                  firebase.auth().signOut()
              })
            }).catch(() => {
              this.refs.toast.show('Something is bad, try again later', 1500)
            })
        }).catch(() => {
            this.refs.toast.show('Something is bad, try again later', 1500)
        })
  }

  ReturnUpdateUserInfoComponent = userInfoData => {

    if(userInfoData.hasOwnProperty('uid')){
      return <UpdateUserInfo userInfo={this.state.userInfo}
            updateUserDisplayName={this.updateUserDisplayName}
            updateUserEmail={this.updateUserEmail}
            updateUserPassword={this.updateUserPassword}
            />
    } else {
      {/*return <UpdateUserInfo userInfo={this.state.userInfo} updateUserDisplayName={this.updateUserDisplayName} />*/}
      // remove this when you have connection
    }
  }

  updateAvatar = async photoUri => {
    const update = {
        photoURL: photoUri
    }
    await firebase.auth().currentUser.updateProfile(update)
    this.getUserInfo()
  }

  changeAvatarUser = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if(resultPermission.status === 'denied'){
      this.refs.toast.show('Is necessary the user accept permissions', 1500)
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })

      if(result.cancelled){
        this.refs.toast.show('The gallery was closed', 1500)
      } else {
        const { uid } = this.state.userInfo
        this.uploadImage(result.uri, uid)
          .then(resolve => {
            this.refs.toast.show('Avatar Update Successfully')

            firebase.storage().ref('avatar/', uid).getDownloadURL()
              .then(resolve => {
                this.updateAvatar(resolve)
              }).catch(err => {
                this.refs.toast.show('Error to request the Avatar')
              })
          })
          .catch( err => {
            this.refs.toast.show('Avatar is not Update Successfully, try again later')
          })
      }
    }

  }

  uploadImage = async (uri, nameImage) => {
    //const resultFetch = fetch(uri)
    //resultFetch.then(resolve => {
    //    console.log(resolve)
    //})

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onerror = reject
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
              resolve(xhr.response)
            }
        }
        xhr.open('GET', uri)
        xhr.responseType = 'blob'
        xhr.send()
    }).then(async resolve => {
        let ref = firebase.storage().ref().child('avatar/', nameImage)
        return await ref.put(resolve)
    }).catch(err => {
        this.refs.toast.show('Error to upload the image to server', 1500)
    })
  }


  render(){

    const { displayName, email, photoURL } = this.state.userInfo
    this.checkUserAvatar(photoURL)

      return (
        <View>
          <View style={styles.viewUserInfo}>
            <Avatar
              rounded
              size="large"
              showEditButton
              onEditPress={() => this.changeAvatarUser()}
              source={{uri: this.checkUserAvatar(photoURL) }}
              containerStyle={styles.userInfoAvatar}
            />
            <View>
              <Text style={styles.displayName} >{ displayName }</Text>
              <Text>{ email }</Text>
            </View>
          </View>
          {this.ReturnUpdateUserInfoComponent(this.state.userInfo)}
          <Button
            title='Sign Out'
            onPress={() => firebase.auth().signOut()}
            buttonStyle={styles.buttonclosession}
            titleStyle={styles.buttonclosessionText}
          />
          <Toast
            ref='toast'
            position='bottom'
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
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#f2f2f2'
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: 'bold'
  },
  buttonclosession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingTop: 15,
    paddingBottom: 15
  },
  buttonclosessionText: {
    color: '#00a680'
  }
})