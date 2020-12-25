import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import ListReviews from "../../components/Restaurants/ListReviews";
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation } = props;
  const { restaurant } = navigation.state.params;
  const [imagesRestaurant, setImagesRestaurant] = useState([]);
  const [rating, setRating] = useState(restaurant.rating);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        restaurant.images.map(async idImage => {
          await firebase
            .storage()
            .ref(`restaurant-images/${idImage}`)
            .getDownloadURL()
            .then(imageUrl => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesRestaurant(arrayUrls);
    })();
  }, []);

  useEffect(() => {
    if (userLogged) {
      db.collection("favorites")
        .where("idRestaurant", "==", restaurant.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(response => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, []);

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos tienes que estar logeado",
        2000
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idRestaurant: restaurant.id
      };

      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Restaurante añadido a la lista de favoritos");
        })
        .catch(() => {
          toastRef.current.show(
            "Error al añadir el restaurante a la lista de favoritos, intentelo más tarde"
          );
        });
    }
  };

  const removeFavorite = () => {
    db.collection("favorites")
      .where("idRestaurant", "==", restaurant.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show(
                "Restaurante eliminado de la lista de favoritos"
              );
            })
            .catch(() => {
              toastRef.current.show(
                "No se ha podido eliminar el restante de la lista de favoritos, intentelo mas tarde"
              );
            });
        });
      });
  };

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#D01B26" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={imagesRestaurant}
        width={screenWidth}
        height={250}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReviews
        navigation={navigation}
        idRestaurant={restaurant.id}
        setRating={setRating}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

function RestaurantInfo(props) {
  const { location, name, address } = props;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    },
    {
      text: "+506 86767543",
      iconName: "phone",
      iconType: "material-community",
      action: null
    },
    {
      text: "dmejia1204@gmail.com",
      iconName: "at",
      iconType: "material-community",
      action: null
    }
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Información sobre el restaurante
      </Text>
      <Map location={location} name={name} height={100} />
      {listInfo.map((item, index) => (
        <ListItem
          key={index}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: "#D01B26"
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5
  },
  viewRestaurantTitle: {
    margin: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey"
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  }
});
