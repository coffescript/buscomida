import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Icon, Text, ListItem, Button, Rating, SearchBar } from 'react-native-elements'

//firebase
import { firebaseApp } from '../utils/Firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp)
import {FireSQL} from 'firesql'
const fireSQL = new FireSQL(firebase.firestore(), {includeId: 'id'})

export default class Search extends Component {

  constructor(props){
    super(props)

    this.state = {
      search: '',
      restaurants: null
    }
  }


  searchRestaurants = async value => {
    this.setState({ search: value})
    let resultRestaurants = null

    const restaurants = fireSQL.query(`
      SELECT * FROM restaurants WHERE name LIKE '${value}%'
    `)

    await restaurants.then(response => {
      resultRestaurants = response
    }).catch(() => {})

    this.setState({
      restaurants: resultRestaurants
    })
  }

  renderListRestaurants = restaurants => {
    if(restaurants){
      return (
        <View>
          {restaurants.map((restaurant, index) => {
            let restaurantClick = {
              item: {
                restaurant: null
              }}
            restaurantClick.item.restaurant = restaurant
            return (
              <ListItem 
                key={index}
                title={restaurant.name}
                leftAvatar={{source: {uri: restaurant.image} }}
                rightIcon={<Icon type='material-community' name='chevron-right' />}
                onPress={() => this.clickRestaurant(restaurantClick)}
              />
            )
          })}
        </View>
      )
    } else {
      <View>
        <Text style={styles.notFoundText}>Search A Restaurant</Text>
      </View>
    }
  }

  clickRestaurant = restaurant => {
    this.props.navigation.navigate('Restaurants', {restaurant})
  }


  render(){

    const { search, restaurants } = this.state

    return (
      <View style={styles.viewBody}>
        <SearchBar 
          placeholder='Search Restaurants'
          onChangeText={this.searchRestaurants}
          value={search}
          containerStyle={styles.searchBar}
          lightTheme={true}
        />
        {this.renderListRestaurants(restaurants)}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  searchBar: {
    marginBottom: 20
  },
  notFoundText: {
    textAlign: 'center'
  }
});
