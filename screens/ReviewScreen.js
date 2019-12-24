import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
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
        {this.props.likedJobs.length === 0 ? (
          <Card title="No jobs">
            <Text>
              There is no favorite jobs yet. Swipe job to the right in Job
              section to add it in Favorite.
            </Text>
          </Card>
        ) : (
          <LikedJobs jobs={this.props.likedJobs} />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ likedJobs }) => ({
  likedJobs
});

export default connect(mapStateToProps)(ReviewScreen);
