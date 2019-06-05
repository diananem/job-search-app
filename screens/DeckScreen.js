import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import {connect} from 'react-redux';

// import * as actions from "../actions"

 class DeckScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View>
          <Text>Deck Screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ jobs }) => ({
  return {jobs: jobs}
});

export default connect(mapStateToProps)(DeckScreen)