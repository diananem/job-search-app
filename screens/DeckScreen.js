import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { MapView, Location } from "expo";
import { Card } from "react-native-elements";

import Deck from "../components/Deck";

class DeckScreen extends Component {
  renderNoMoreCards() {
    return (
      <Card
        title="No more jobs"
        titleStyle={{
          minHeight: 40,
          paddingTop: 10,
          textAlignVertical: "center"
        }}
      >
        <Text style={{ marginBottom: 10 }}>
          There is no jobs in this region for now... Search in another city or
          try later
        </Text>
      </Card>
    );
  }

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
