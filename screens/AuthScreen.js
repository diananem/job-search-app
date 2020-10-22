import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { connect } from "react-redux";

import * as actions from "../actions";

class AuthScreen extends Component {
  componentDidMount() {
    AsyncStorage.removeItem("fb_token");

    this.props.facebookLogin();
    // this.onAuthComplete(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete = (props) => {
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
  token: auth.token,
});

export default connect(mapStateToProps, actions)(AuthScreen);
