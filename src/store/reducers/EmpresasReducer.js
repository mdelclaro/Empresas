import { SET_EMPRESAS } from '../actions/types';

const INITIAL_STATE = {
  empresas: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EMPRESAS:
      return {
        ...state,
        empresas: action.payload
      };
    default:
      return state;
  }
};
