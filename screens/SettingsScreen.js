import React, { Component } from "react";
import { Button } from "react-native-elements";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: "delete-forever" }}
          backgroundColor="#f44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}

export default connect(
  null,
  { clearLikedJobs }
)(SettingsScreen);
