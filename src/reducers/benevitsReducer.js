import {
  NEXTIA_LIST_BENEVITS
} from '../actions/types';

const INTIAL_STATE = {
  benevits: []
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case NEXTIA_LIST_BENEVITS:
      return { ...state, benevits: action.payload };
    default:
      return state;
  }
};
