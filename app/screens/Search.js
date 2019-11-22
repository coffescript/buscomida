import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Search() {
  return (
    <View style={styles.viewBody}>
      <Text>Search</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
