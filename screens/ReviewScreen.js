import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

import LikedJobs from "../components/LikedJobs";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Review Jobs",
    headerRight: (
      <Button
        type="clear"
        icon={{ name: "settings", color: "#2089dc", size: 30 }}
        onPress={() => navigation.navigate("Settings")}
      />
    )
  });

  render() {
    return (
      <ScrollView>
        <LikedJobs jobs={this.props.likedJobs} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ likedJobs }) => ({
  likedJobs
});

export default connect(mapStateToProps)(ReviewScreen);
