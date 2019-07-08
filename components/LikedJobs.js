import React from "react";
import { View, Text, Linking, Image } from "react-native";
import { Card, Button } from "react-native-elements";

import { formatDate } from "../formatDate";

const LikedJobs = ({ jobs }) =>
  jobs
    .map(job => {
      const {
        id,
        title,
        company,
        created_at,
        how_to_apply,
        location,
        type,
        company_logo
      } = job;
      console.log(company_logo);
      const extractLink = str => {
        const matches = str.match(/"(.*?)"/);
        return matches ? matches[1] : str;
      };
      const applyLink = extractLink(how_to_apply);
      return (
        <Card title={title} key={id}>
          {company_logo && (
            <View style={{ height: 100 }}>
              <Image
                resizeMode="contain"
                style={{ height: 100, flex: 1, justifyContent: "center" }}
                source={{
                  uri: company_logo
                }}
              />
            </View>
          )}

          <View style={styles.jobDetails}>
            <Text style={{ fontStyle: "italic" }}>{company}</Text>
            <Text>{formatDate(created_at)}</Text>
          </View>
          <View style={styles.jobDetails}>
            <Text>{job.location}</Text>
            <Text>{job.type}</Text>
          </View>

          <Button
            style={{ marginTop: 30 }}
            title="Apply Now!"
            onPress={() => Linking.openURL(applyLink)}
          />
        </Card>
      );
    })
    .reverse();

const styles = {
  jobDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
};

export default LikedJobs;
