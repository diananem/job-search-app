import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { MapView, Location } from "expo";
import { Card } from "react-native-elements";

import Deck from "../components/Deck";

class DeckScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Deck data={this.props.jobs} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ jobs }) => ({
  jobs
});

export default connect(mapStateToProps)(DeckScreen);
