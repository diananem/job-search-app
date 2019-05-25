import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";
import { APP_ID } from "../utils";

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
    console.log(err);
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
