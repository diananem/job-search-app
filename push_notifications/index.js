import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";
import axios from "axios";

const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

export default async () => {
  let previousToken = await AsyncStorage.getItem("pushtoken");
  if (previousToken) {
    return;
  } else {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    await axios
      .post(
        PUSH_ENDPOINT,
        { token: { token } },
        {
          headers: {
            host: "exp.host",
            accept: "application/json",
            "accept-encoding": "gzip, deflate",
            "content-type": "application/json"
          }
        }
      )
      .then(response => {
        console.log("reactNativeDemo", "response get details:" + response.data);
      })
      .catch(error => {
        console.log("axios error:", error);
      });
    AsyncStorage.setItem("pushtoken", token);
  }
};
