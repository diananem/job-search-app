import React, { Component } from "react";
import { TextInput, View, SafeAreaView } from "react-native";
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
    },
    search: ""
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  onPress = () => {
    const { region, search } = this.state;
    this.props.fetchJobs(region, search, () => {
      this.props.navigation.navigate("Deck", { region });
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
        <View style={{ position: "absolute", top: 80, left: 30, right: 30 }}>
          <TextInput
            style={{
              height: 50,
              borderColor: "#499DF5",
              borderWidth: 2,
              fontSize: 21,
              paddingLeft: 10
            }}
            placeholder="Enter your speciality"
            onChangeText={text => this.setState({ search: text })}
          />
        </View>

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
