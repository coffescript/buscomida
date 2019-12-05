import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
// float button
import { ActionButton } from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

//firebase
import { firebaseApp } from '../../utils/Firebase'
import firebase from 'firebase'
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp)


export default class RestaurantsScreen extends Component {
  constructor(){
    super()
    this.state = {
      login: false,
      restaurants: null,
      startRestaurants: null,
      limitRestaurants: 8,
      isLoading: true
    }
  }

  componentDidMount(){
    this.checkLogin()
    this.loadRestaurants()
  }

  checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          login: true
        })
      } else {
        this.setState({
          login: false
        })
      }
    })
  }

  //goToScreen = nameScreen => {
  //  this.props.navigation.navigate(nameScreen)
  //}

  loadActionButton = () => {
    const { login } = this.state

    if(login){
      return (
      <ActionButton
        buttonColor='#00a680'
        onPress={() => this.props.navigation.navigate('AddNewRestaurants', { loadRestaurants: this.loadRestaurants})}
      />
      )
    }
    return null
  }

  loadRestaurants = async () => {
    const { limitRestaurants } = this.state
    let resultRestaurants = []

    const restaurants = db.collection('restaurants')
          .orderBy('createAt', 'desc')
          .limit(limitRestaurants)

      await restaurants.get().then(response => {
        this.setState({
          startRestaurants: response.docs[response.docs.length - 1]
        })
        response.forEach(doc => {
          let restaurant = doc.data()
          restaurant.id = doc.id
          resultRestaurants.push(restaurant)
        })
        this.setState({
          restaurants: resultRestaurants
        })
      })
  }

  renderRow = (restaurant) => {
    const { name, city, address, description, image } = restaurant.item.restaurant

    return (
    <TouchableOpacity onPress={() => this.clickRestaurant(restaurant)}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode='cover'
            source={{uri: image}}
            style={styles.imageRestaurant}
          />
        </View>
        <View>
          <Text style={styles.FlatListRestaurantName}>{name}</Text>
          <Text style={styles.FlatListRestaurantAddress}>{city}, {address}</Text>
          <Text style={styles.FlatListRestaurantDescription}>{description.substr(0, 60)}...</Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

  clickRestaurant = restaurant => {
    this.props.navigation.navigate('RestaurantDetails', { restaurant })
  }

  handleLoadMore = async () => {
    const {  limitRestaurants, startRestaurants } = this.state
    let resultRestaurants = []

    this.state.restaurants.forEach(doc => {
      resultRestaurants.push(doc)
    })

    const restaurantsDB = db.collection('restaurants').orderBy('createAt', 'desc').startAfter(startRestaurants.data().createAt).limit(limitRestaurants)

    await restaurantsDB.get().then(response => {
      if(response.docs.length > 0){
        this.setState({
          startRestaurants: response.docs[response.docs.length -1]
        })
      } else {
        this.setState({
          isLoading: false
        })
      }

      response.forEach(doc => {
        let restaurant = doc.data()
        restaurant.id = doc.id
        resultRestaurants.push({restaurant})
      })

      this.setState({
        restaurants: resultRestaurants
      })
    })
  }

  renderFooter = () => {

    if(this.state.isLoading) {
      return (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size='large' />
        </View>
        )
    } else {
      return (
        <View style={styles.notFoundRestaurants}>
        <Text>No more Restaurants</Text>
      </View>
      )
    }
  }

  renderFlatList = (restaurants) => {

    //const { restaurants } = this.state

    if(restaurants){
      return (
        <FlatList
          data={restaurants}
          renderItem={this.renderRow()}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter()}
        />
      )
    } else {
      return (
        <View style={styles.startLoadRestaurants}>
        <ActivityIndicator size='large' />
        <Text>Charge Restaurants</Text>
      </View>
      )
    }
  }

render() {

  const { restaurants } = this.state

  return (
    <View style={styles.viewBody}>
      
      {this.renderFlatList(restaurants)}
      {this.loadActionButton()}
    </View>
    )
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  startLoadRestaurants: {
    marginTop: 20,
    alignItems: 'center'
  },
  viewRestaurant: {
    flexDirection: 'row',
    margin: 10
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  viewRestaurantImage: {
    marginRight: 15
  },
  FlatListRestaurantName: {
    fontWeight: 'bold'
  },
  FlatListRestaurantAddress: {
    paddingTop: 2,
    color: 'grey'
  },
  FlatListRestaurantDescription: {
    paddingTop: 2,
    color: 'grey',
    width: 300
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center'
  }
})
