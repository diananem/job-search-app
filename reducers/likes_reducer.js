import _ from "lodash";
import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";

const likes = (state = [], action) => {
  switch (action.type) {
    case CLEAR_LIKED_JOBS:
      return [];
    case LIKE_JOB:
      return _.uniqBy([action.payload, ...state], "id");

    default:
      return state;
  }
};

export default likes;
