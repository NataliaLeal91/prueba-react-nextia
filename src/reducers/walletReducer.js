import {
  NEXTIA_LIST_WALLETS
} from '../actions/types';

const INTIAL_STATE = {
  wallets: []
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case NEXTIA_LIST_WALLETS:
      return { ...state, wallets: action.payload };
    default:
      return state;
  }
};
