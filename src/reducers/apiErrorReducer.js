import { NEXTIA_API_ERRORS } from '../actions/types';

const INTIAL_STATE = {
  isError: null,
  error: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case NEXTIA_API_ERRORS:
      return { ...state, isError: true, error: action.payload };
    default:
      return state;
  }
};
