import {
  SIGN_IN,
  SIGN_OUT,
  NEXTIA_API_ERRORS,
  NEXTIA_API_SUCCESS,
  NEXTIA_LIST_WALLETS,
  NEXTIA_LIST_BENEVITS
} from './types';

import nextia from '../apis/nextia';

export const signIn = (email, password) => async (dispatch) => {
 
  await nextia.post('/login', {
    user: { email, password }
  }).then((response) => {

    dispatch({ type: SIGN_IN, payload: {

      // JWT token
      authToken: response.headers.authorization,
      data: response.data
    } });

    dispatch({ type: NEXTIA_API_SUCCESS, payload: null });
  }).catch((err) => {
    
    dispatch({ type: NEXTIA_API_ERRORS, payload: err.response.data.error});
  });
};

export const signOut = () => async (dispatch) => {

  await nextia.delete('/logout').then(() => {

    dispatch({ type: SIGN_OUT, payload: null });
  }).catch((err) => {
    
    dispatch({ type: NEXTIA_API_ERRORS, payload: err.response.data.error});
  });
};

export const fetchWallets = (token) => async (dispatch) => {
 
  await nextia.get('/member/wallets', {
    headers: { Authorization: token }
  }).then((response) => {

    dispatch({ type: NEXTIA_LIST_WALLETS, payload: response.data });
  }).catch((err) => {
    
    dispatch({ type: NEXTIA_API_ERRORS, payload: err.response.data.error });
  });
};

export const fetchBenevits = (token) => async (dispatch) => {

  await nextia.get('/member/landing_benevits', {
    headers: { Authorization: token }
  }).then((response) => {

    dispatch({ type: NEXTIA_LIST_BENEVITS, payload: response.data });
  }).catch((err) => {
    
    dispatch({ type: NEXTIA_API_ERRORS, payload: err.response.data.error });
  });
};


export const closeErrorAlert = () => async (dispatch) => {
  dispatch({ type: NEXTIA_API_SUCCESS, payload: null });
}
