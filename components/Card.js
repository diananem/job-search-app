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
      <Text>{formatDate(job.created_at)}</Text>
    </View>
    <View style={styles.jobDetails}>
      <Text>{job.location}</Text>
      <Text>{job.type}</Text>
    </View>
  </Card>
);

const formatDate = date => {
  let s = (+new Date() - Date.parse(date)) / 1e3;
  let m = s / 60;
  let h = m / 60;
  let d = h / 24;
  let y = d / 365.242199;
  let tmp;
  const isEqual = num => (tmp = Math.round(num)) === 1;
  const isBigger = num => num < 1.01;

  return isEqual(s)
    ? "just now"
    : isBigger(m)
    ? tmp + " seconds ago"
    : isEqual(m)
    ? "a minute ago"
    : isBigger(h)
    ? tmp + " minutes ago"
    : isEqual(h)
    ? "an hour ago"
    : isBigger(d)
    ? tmp + " hours ago"
    : isEqual(d)
    ? "yesterday"
    : isBigger(y)
    ? tmp + " days ago"
    : isEqual(y)
    ? "a year ago"
    : tmp + " years ago";
};

const styles = {
  jobDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
};

export default CardComponent;
