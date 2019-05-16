import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Hello!", color: "#3192ff" },
  { text: "Welcome to Job Search app", color: "#6f00ff" },
  { text: "Let's begin", color: "#009688" }
];

export default class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </SafeAreaView>
    );
  }
}
