import { SET_EMPRESAS, SEARCH_EMPRESA } from '../actions/types';

const INITIAL_STATE = {
  empresas: [],
  filteredEmpresas: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EMPRESAS:
      return {
        ...state,
        empresas: action.payload
      };
    case SEARCH_EMPRESA:
    return {
      ...state,
      filteredEmpresas: state.empresas.filter(item => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = action.payload.toUpperCase();

        return itemData.indexOf(textData) > -1;
      })
    };
    default:
      return state;
  }
};
