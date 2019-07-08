import React, { Component } from "react";
import { Text, ScrollView, Button } from "react-native";
import { connect } from "react-redux";

import LikedJobs from "../components/LikedJobs";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Review Jobs",
    headerRight: (
      <Button
        title=" Go to Settings "
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
