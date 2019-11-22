import React from "react"
import { StyleSheet, Text, View } from 'react-native'

//lib firebase
import * as firebase from 'firebase'

//config firebase
import firebaseConfig from './app/utils/Firebase'
firebase.initializeApp(firebaseConfig)

import UserNavigation from './app/navigations/User'

export default function App() {
  return (
    <View style={styles.container}>
      <UserNavigation />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
