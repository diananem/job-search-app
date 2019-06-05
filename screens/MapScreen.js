import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import { MapView } from "expo";
import { connect } from "react-redux";

import * as actions from "../actions";

class MapScreen extends Component {
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

  onPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate("Deck");
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search"
            icon={{ name: "search", color: "white" }}
            buttonStyle={styles.button}
            onPress={this.onPress}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30
  },
  button: {
    padding: 15
  }
};

export default connect(
  null,
  actions
)(MapScreen);
