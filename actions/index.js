import AsyncStorage from "@react-native-community/async-storage";
import * as Facebook from "expo-facebook";
import * as axios from "axios";
import qs from "qs";
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
} from "./types";
import { APP_ID } from "../utils";

const JOB_ROOT_URL = "https://jobs.github.com/positions.json?";

const buildJobUrl = (region, search) => {
  const query = qs.stringify({
    search,
    lat: region.latitude,
    long: region.longitude,
  });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, search, navigate) => async (dispatch) => {
  try {
    const url = buildJobUrl(region, search);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    navigate();
  } catch (err) {
    console.error(err);
  }
};

export const facebookLogin = () => async (dispatch) => {
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

const logIn = async (dispatch) => {
  await Facebook.initializeAsync({ appId: APP_ID });
  let { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });

  if (type === "success") {
    await AsyncStorage.setItem("fb_token", token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    //type === 'cancel'
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB,
  };
};
export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS,
  };
};
