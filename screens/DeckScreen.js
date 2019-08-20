import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { MapView, Location } from "expo";
import { Card, Icon } from "react-native-elements";

import Deck from "../components/Deck";
import * as actions from "../actions";

class DeckScreen extends Component {
  static navigationOptions = {
    title: "Jobs",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="filter-none" size={30} color={tintColor} />
    )
  };

  render() {
    const { navigation, jobs, likeJob } = this.props;

    const location = navigation.getParam("region", {
      latitude: 37,
      longitude: -122,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04
    });
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ marginTop: 10 }}>
          <Deck
            data={jobs}
            location={location}
            navigation={navigation}
            onSwipeRight={job => likeJob(job)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ jobs }) => ({
  jobs
});

export default connect(
  mapStateToProps,
  actions
)(DeckScreen);
