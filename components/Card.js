import React from "react";
import MapView from "react-native-maps";
import { View, Text, Platform } from "react-native";
import { Card } from "react-native-elements";

import { formatDate } from "../formatDate";

const CardComponent = ({ job, location }) => (
  <Card
    key={job.id}
    title={job.title}
    titleStyle={{
      minHeight: 40,
      paddingTop: 10,
      textAlignVertical: "center"
    }}
    containerStyle={{ minHeight: Platform.OS === "ios" ? 650 : 550 }}
  >
    <View style={{ height: Platform.OS === "ios" ? 300 : 200 }}>
      <MapView
        scrollEnabled={false}
        style={{ flex: 1 }}
        initialRegion={location}
        cacheEnabled={true}
      />
    </View>
    <View style={styles.jobDetails}>
      <Text style={styles.companyName}>{job.company}</Text>
      <Text>{formatDate(job.created_at)}</Text>
    </View>
    <View style={{ marginTop: 20 }}>
      <Text numberOfLines={10} ellipsizeMode="tail">
        {job.description.replace(/(<([^>]+)>)/g, "")}
      </Text>
    </View>
  </Card>
);

const styles = {
  jobDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  companyName: {
    fontStyle: "italic",
    flexWrap: "wrap",
    maxWidth: 200
  }
};

export default CardComponent;
