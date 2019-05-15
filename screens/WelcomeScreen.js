import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";

export default class WelcomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Text>Welcome Screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}
