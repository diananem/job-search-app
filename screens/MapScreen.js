import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { MapView } from "expo";

export default class MapScreen extends Component {
  state = {
    region: {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    }
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
      </SafeAreaView>
    );
  }
}
