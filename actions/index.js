import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import * as axios from "axios";
import qs from "qs";
// import reverseGeocode from "latlng-to-zip";
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FETCH_JOBS
} from "./types";
import { APP_ID } from "../utils";

const JOB_ROOT_URL = "https://jobs.github.com/positions.json?";

const JOB_QUERY_PARAMS = {
  publisher: "",
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10,
  q: "javascript"
};

const buildJobUrl = region => {
  const query = qs.stringify({
    search: "javascript",
    lat: region.latitude,
    long: region.longitude
  });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = region => async dispatch => {
  try {
    // let zipCode = await reverseGeocode(region);
    const url = buildJobUrl(region);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const facebookLogin = () => async dispatch => {
  try {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
      //dispatch an action - login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      // start login process
      logIn(dispatch);
    }
  } catch (err) {
    console.error(err);
  }
};

const logIn = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
    permissions: ["public_profile"]
  });

  if (type === "success") {
    await AsyncStorage.setItem("fb_token", token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    //type === 'cancel'
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
};
