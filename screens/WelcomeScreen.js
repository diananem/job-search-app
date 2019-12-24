import React, { Component } from "react";
import { Text, View, SafeAreaView, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Hello!", color: "#3192ff" },
  { text: "Welcome to Job Search app", color: "#6f00ff" },
  { text: "Let's begin", color: "#009688" }
];

export default class WelcomeScreen extends Component {
  state = { token: null };

  async componentDidMount() {
    // AsyncStorage.removeItem("fb_token");
    const token = await AsyncStorage.getItem("fb_token");
    this.props.navigation.navigate(token ? "Map" : "Welcome");
    if (!token) {
      this.setState({ token: false });
    }
  }
  // Fetch the token from storage then navigate to our appropriate place
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem("fb_token");

  //   // This will switch to the App screen or Auth screen and this loading
  //   // screen will be unmounted and thrown away.
  //   this.props.navigation.navigate(userToken ? "Map" : "Welcome");
  // };

  onSlidesComplete = () => {
    this.props.navigation.navigate("Auth");
  };

  render() {
    if (this.state.token === null) {
      return <AppLoading />;
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </SafeAreaView>
    );
  }
}
