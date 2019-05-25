import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Provider } from "react-redux";

import store from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Auth: { screen: AuthScreen },
    Main: {
      screen: createBottomTabNavigator({
        Map: { screen: MapScreen },
        Deck: { screen: DeckScreen },
        Review: {
          screen: createStackNavigator({
            Review: { screen: ReviewScreen },
            Settings: { screen: SettingsScreen }
          })
        }
      })
    }
  }
  // { lazy: true }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
