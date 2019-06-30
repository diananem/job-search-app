import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { MapView, Location } from "expo";
import { Card } from "react-native-elements";

import Deck from "../components/Deck";

class DeckScreen extends Component {
  render() {
    const location = this.props.navigation.getParam("region", {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    });
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Deck data={this.props.jobs} location={location} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ jobs }) => ({
  jobs
});

export default connect(mapStateToProps)(DeckScreen);
