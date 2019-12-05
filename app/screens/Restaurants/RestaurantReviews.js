import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Image, Icon, AirbnbRating, Button, Overlay } from 'react-native-elements'

//firebase
import { firebaseApp } from '../../utils/Firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp)

//tcomb
import t from 'tcomb-form-native'
import { ReviewRestaurantStruct, ReviewRestaurantOptions } from '../../forms/ReviewRestaurant'
const Form = t.form.Form

//toast
import Toast, { DURATION } from 'react-native-easy-toast'


export default class RestaurantReviewsScreen extends Component {
constructor(props){
  super(props)
  this.state = {
    loading: false
  }
}

sendReview = () => {
  const ratingValue = this.refs.rating.state.position

  const user = firebase.auth().currentUser

  this.setState({ loading: true })

  if(ratingValue === 0){
    this.refs.toast.show('You need give a puntuation to the restaurant', 1500)
    this.setState({ loading: false })
  } else {
    const validate = this.refs.reviewRestaurantForm.getValue()

    if(!validate){
      this.refs.toast.show('You need complete the form', 1500)
      this.setState({ loading: false })
    } else {
      const user = firebase.auth().currentUser
      const data = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idRestaurant: this.props.navigation.state.params.id,
        title: validate.title,
        review: validate.review,
        rating: ratingValue,
        createAt: new Date()
      }

      db.collection('reviews').add(data).then(() => {
        const restaurantRef = db.collection('restaurants')
          .doc(this.props.navigation.state.params.id)

          restaurantRef.get().then(response => {
            const restaurantData = response.data()
            const ratingTotal = restaurantData.ratingTotal + ratingValue
            const quantityVoting = restaurantData.quantityVoting + 1
            const rating = ratingTotal / quantityVoting

            restaurantRef.update({ rating, ratingTotal, quantityVoting }).then(() => {
              this.setState({loading: false})
              this.refs.toast.show('Review Added Successfully', 50, () => {
                this.props.navigations.state.params.loadReviews()
                this.props.navigation.goBack()
              })
            })
          })
      }).catch(() => {
        this.refs.toast.show('Something is Bad, Try Again Later', 1500)
      })
    }
  }
}
  
render(){

    const { loading } = this.state

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          ref='rating'
          count={6}
          reviews={[
              'Worst',
              'Bad',
              'Regular',
              'Excellent',
              'Exceptional',
              'Perfect'
          ]}
          defaultRating={0}
          size={35}
        />
      </View>
      <View style={styles.formReview}>
        <Form 
          ref='reviewRestaurantForm'
          type={ReviewRestaurantStruct}
          options={ReviewRestaurantOptions}
        />
      </View>

      <View style={styles.viewSendReview}>
        <Button 
          title='Submit'
          buttonStyle={styles.btnSendReview}
          onPress={() => this.sendReview()}
        />
      </View>

      <Overlay
        isVisible={loading}
        width='auto'
        height='auto'
        overlayStyle={styles.OverlayLoading}
      >
        <View>
          <Text style={styles.OverlayLoadingText}>Send Review, Please Wait...</Text>
          <ActivityIndicator size='large' color='#00a680' />
        </View>
      </Overlay>

      <Toast
      ref='toast'
      position='bottom'
      positionValue={320}
      fadeInDuration={1000}
      fadeOutDuration={1000}
      opacity={0.8}
      textStyle={{ color: '#fff'}}
      />

    </View>
    )}
}

const styles = StyleSheet.create({
    viewBody: {
      flex: 1
    },
    viewRating: {
      height: 11,
      backgroundColor: '#f2f2f2'
    },
    formReview: {
      margin: 10,
      marginTop: 40
    },
    viewSendReview: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20
    },
    btnSendReview: {
      backgroundColor: '#00a680'
    },
    OverlayLoading: {
      padding: 20

    },
    OverlayLoadingText: {
      color: '#00a680',
      marginBottom: 20,
      fontSize: 20
    }
  })
  