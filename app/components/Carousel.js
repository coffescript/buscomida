import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-banner-carousel";

export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;

  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={width}
      pageIndicatorStyle={styles.indicator}
      activePageIndicatorStyle={styles.indicatorActive}
    >
      {arrayImages.map(urlImage => (
        <View key={urlImage}>
          <Image style={{ width, height }} source={{ uri: urlImage }} />
        </View>
      ))}
    </Carousel>
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#00a680"
  },
  indicatorActive: {
    backgroundColor: "#00ffc5"
  }
});
