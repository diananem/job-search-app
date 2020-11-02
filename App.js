import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Icon } from "react-native-elements";

import registerForPushNotificationsAsync from "./push_notifications";
import configureStore from "./store";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingsScreen from "./screens/SettingsScreen";

const { persistor, store } = configureStore();

export default class App extends Component {
  componentDidMount() {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener((notification) => {
      Alert.alert(
        "A new job posted",
        "Check out your region for more jobs",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const AppNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Auth: { screen: AuthScreen },
    Main: {
      screen: createBottomTabNavigator(
        {
          Map: { screen: MapScreen },
          Deck: { screen: DeckScreen },
          Review: {
            screen: createStackNavigator(
              {
                Review: { screen: ReviewScreen },
                Settings: { screen: SettingsScreen },
              },
              { headerBackTitleVisible: true }
            ),
            navigationOptions: {
              title: "Favorite",
              tabBarIcon: ({ tintColor }) => (
                <Icon name="star" size={30} color={tintColor} />
              ),
            },
          },
        },
        {
          tabBarOptions: {
            labelStyle: { fontSize: 14 },
          },
        }
      ),
    },
  },
  { lazy: true }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
