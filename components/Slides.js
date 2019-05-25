import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

class Slides extends Component {
  renderLastSlide(index) {
    const { data, onComplete } = this.props;
    if (index === data.length - 1) {
      return (
        <View style={styles.buttonStyle}>
          <Button color="#f5bf80" title="Get Started" onPress={onComplete} />
        </View>
      );
    }
  }

  renderSlides = () =>
    this.props.data.map((slide, index) => (
      <View
        key={slide.text}
        style={[styles.slide, { backgroundColor: slide.color }]}
      >
        <Text style={styles.slideText}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));

  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH
  },
  slideText: {
    fontSize: 50,
    color: "white",
    textAlign: "center"
  },
  buttonStyle: {
    marginTop: 50
  }
});

export default Slides;
