import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { Image, AirbnbRating, Button, Overlay, Card, Rating } from 'react-native-elements'

//firebase
import { firebaseApp } from '../utils/Firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp)

export default class TopFive extends Component {
  constructor(props){
    super(props)

    this.state = {
      restaurants: null
    }
  }

  loadTopFiveRestaurants = async () => {
    const restaurants = db.collection('restaurants')
      .orderBy('rating', 'desc').limit(5)

    let restaurantArray = []

    await restaurants.get().then(response => {
      response.forEach(doc => {
        let restaurant = doc.data()
        restaurant.id = doc.id
        restaurantsArray.push(restaurant)
      })
    })

    this.setState({
      restaurants: restaurantArray
    })
  }

  clickRestaurant = restaurant => {
    this.props.navigation.navigate('Restaurants', {restaurant})
  }

  renderRestaurants = restaurants => {
    if(restaurants){
      return (
        <View>
          {restaurants.map((restaurant, index) => {
            const restaurantClick = {
              item: {
                restaurant: null
              }
            }
            restaurantClick.item.restaurant = restaurant
            return (
            <TouchableOpacity key={index} onPress={() => this.clickRestaurant(restaurantClick)}>
              <Card>
                <Image
                  style={styles.restaurantImage}
                  resizeMode='cover'
                  source={{uri: restaurant.image }}
                 />
                 <View style={styles.titleRating}>
                   <Text style={styles.title}>{restaurant.name}</Text>
                   <Rating 
                     imageSize={20}
                     startingValue={restaurant.rating}
                     readonly
                     style={styles.rating}
                   />
                 </View>
                 <Text style={styles.description} >{restaurant.description}</Text>
              </Card>
            </TouchableOpacity>
            )
          })}
        </View>
      )
    } else {
      return (
        <View>
          <ActivityIndicator size='large' />
          {/*<Text>Loading Top 5...</Text>*/}
        </View>
      )
    }
  }

render(){

  const { restaurants } = this.state

  return (
    <ScrollView style={styles.viewBody}>
      {this.renderRestaurants(restaurants)}
    </ScrollView>
  )
}
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  restaurantImage: {
    width: '100%',
    height: 200
  },
  titleRating: {
    flexDirection: 'row',
    marginTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  rating: {
    position: 'absolute',
    right: 0
  },
  description: {
    color: 'grey',
    marginTop: 10,
    textAlign: 'justify'
  }
});
