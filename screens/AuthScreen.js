import React, { Component } from "react";
import { Text, View, SafeAreaView, AsyncStorage } from "react-native";
import { connect } from "react-redux";

import * as actions from "../actions";

class AuthScreen extends Component {
  componentDidMount() {
    AsyncStorage.removeItem("fb_token");

    this.props.facebookLogin();
    // this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete = props => {
    if (props.token) {
      this.props.navigation.navigate("Map");
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
