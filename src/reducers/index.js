import { combineReducers } from 'redux';
import authReducer from './authReducer';
import walletReducer from './walletReducer';
import benevitsReducer from './benevitsReducer'
import apiErrorReducer from './apiErrorReducer';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  wallets: walletReducer,
  benevits: benevitsReducer,
  apiError: apiErrorReducer
});