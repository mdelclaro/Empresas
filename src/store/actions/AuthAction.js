
import { AsyncStorage } from 'react-native';
import { AUTH_SET_AUTH } from './types';
import { uiStartLoading, uiStopLoading } from './index';

import startApp from '../../App';

export const logInUser = (email, password) => {
  console.log('Email: ' + email + 'Password: ' + password);
  return (dispatch) => {
    dispatch(uiStartLoading());
    const url = 'http://empresas.ioasys.com.br/api/v1/users/auth/sign_in';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => {
        dispatch(uiStopLoading());
        console.log(err);
        alert('Falha na autenticação!');
      })
      .then(res => {
        dispatch(uiStopLoading());
        const data = res.headers.map;
        if (res.ok) {
          const token = data['access-token'];
          const client = data.client;
          const uid = data.uid;
          dispatch(authStoreAuth(token, client, uid));
          startApp();
        } else {
          alert('Falha na autenticação');
        }
      });
  };
};

export const authStoreAuth = (token, client, uid) => {
  return dispatch => {
    dispatch(authSetAuth(token, client, uid));
    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:client', client);
    AsyncStorage.setItem('ap:auth:uid', uid);
  };
};

export const authSetAuth = (token, client, uid) => {
  return {
    type: AUTH_SET_AUTH,
    payload: { token, client, uid }
  };
};

export const authGetAuth = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const stateToken = getState().auth.token;
      if (!stateToken) {
        Promise.all([
          AsyncStorage.getItem('ap:auth:token'),
          AsyncStorage.getItem('ap:auth:client'),
          AsyncStorage.getItem('ap:auth:uid')
        ])
          .then(data => {
            const token = data[0];
            const client = data[1];
            const uid = data[2];
            console.log('token: ' + token + '\nclient: ' + client + '\nuid: ' + uid);
            if (!token || !client || !uid) {
              reject();              
            }
            dispatch(authSetAuth(token, client, uid));
            const authData = {
              token, client, uid
            };
            resolve(authData);
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      } else {
        const authData = {
          token: stateToken,
          client: getState().auth.client,
          uid: getState().auth.uid
        };
        resolve(authData);
      }
      //return promise;
    });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetAuth())
      .then(auth => {
        dispatch(authSetAuth(auth.token, auth.client, auth.uid));
        startApp();
      })
      .catch(err => {
        console.log(err);
      });
  };
};
