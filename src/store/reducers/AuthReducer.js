import { AUTH_SET_AUTH } from '../actions/types';

const INITIAL_STATE = {
  token: null,
  client: null,
  uid: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SET_AUTH:
      return {
        ...state,
        token: action.payload.token,
        client: action.payload.client,
        uid: action.payload.uid
      };
    default:
      return state;
  }
};
