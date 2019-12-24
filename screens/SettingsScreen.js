import React, { Component } from "react";
import { Button } from "react-native-elements";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";

class SettingsScreen extends Component {
  render() {
    const onPress = () => {
      this.props.clearLikedJobs();
      this.props.navigation.navigate("Review");
    };
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: "delete-forever" }}
          buttonStyle={{ backgroundColor: "#f44336" }}
          onPress={onPress}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
