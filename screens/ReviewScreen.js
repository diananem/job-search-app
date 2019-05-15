import React, { Component } from "react";
import { Text, View, Button, Platform } from "react-native";

export default class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Review Jobs",
    headerRight: (
      <Button
        title=" Go to Settings "
        onPress={() => navigation.navigate("Settings")}
      />
    )
  });

  render() {
    return (
      <View>
        <Text>Review Screen</Text>
      </View>
    );
  }
}
