import React from "react";
import { MapView } from "expo";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

const CardComponent = ({ job }) => (
  <Card
    key={job.id}
    title={job.title}
    titleStyle={{
      minHeight: 40,
      paddingTop: 10,
      textAlignVertical: "center"
    }}
    containerStyle={{ minHeight: 500 }}
  >
    <View style={{ height: 300 }}>
      <MapView
        scrollEnabled={false}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37,
          longitude: -122,
          longitudeDelta: 0.045,
          latitudeDelta: 0.02
        }}
      />
    </View>
    <View style={styles.jobDetails}>
      <Text>{job.company}</Text>
      <Text>{job.created_at}</Text>
    </View>
    <View style={styles.jobDetails}>
      <Text>{job.location}</Text>
      <Text>{job.type}</Text>
    </View>
  </Card>
);

const styles = {
  jobDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
};

export default CardComponent;
