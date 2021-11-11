import { combineReducers } from 'redux';
import authReducer from './authReducer';
import apiErrorReducer from './apiErrorReducer';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  apiError: apiErrorReducer
});