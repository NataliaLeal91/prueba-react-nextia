import {
  SIGN_IN,
  SIGN_OUT,
  NEXTIA_API_ERRORS
} from './types';

import nextia from '../apis/nextia';

export const signIn = () => async (dispatch) => {
    await nextia.post('/login', {
      user: { email: "prueba@nextia.mx", password: 'PruebaNextia2021' }
    }).then((response) => {

      dispatch({ type: SIGN_IN, payload: {

        // JWT token
        authToken: response.headers.authorization,
        data: response.data
      } });
  
    }).catch((err) => {
      console.log("err",err.response.data.error);
      
      dispatch({ type: NEXTIA_API_ERRORS, payload: err.response.data.error});
    });
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};