import { combineReducers } from 'redux';
import authReducer from './authReducer';
import apiErrorReducer from './apiErrorReducer';

export default combineReducers({
  auth: authReducer,
  apiError: apiErrorReducer
});
