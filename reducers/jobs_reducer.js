import { FETCH_JOBS } from "../actions/types";

const jobs = (state = [], action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    default:
      return state;
  }
};

export default jobs;
