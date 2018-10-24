import { SET_EMPRESAS, SEARCH_EMPRESA } from './types';
import { authGetAuth } from './AuthAction';
import { uiStartLoading, uiStopLoading } from './UIAction';

export const getEmpresas = () => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(authGetAuth())
      .catch(() => {
        dispatch(uiStopLoading());
        alert('Ocorreu algum problema. Tente novamente!');
      })
      .then(auth => {
        const token = auth.token;
        const uid = auth.uid;
        const client = auth.client;
        const url = 'http://empresas.ioasys.com.br/api/v1/enterprises';

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': token,
            client,
            uid
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            dispatch(uiStopLoading());
            throw (new Error());
          })
          .then(parsedRes => {
            const address = 'http://empresas.ioasys.com.br';
            const empresas = parsedRes.enterprises.map(empresa => {
              return {
                id: empresa.id,
                name: empresa.enterprise_name,
                description: empresa.description,
                country: empresa.country,
                type: empresa.enterprise_type.enterprise_type_name,
                image: empresa.photo === null ? null : address + empresa.photo
              };
            });
            dispatch(uiStopLoading());
            dispatch(setEmpresas(empresas));
          })
          .catch(err => {
            dispatch(uiStopLoading());
            console.log(err);
            alert('Falha ao obter as empresas!');
          });
      });
  };
};

export const setEmpresas = empresas => {
  return {
    type: SET_EMPRESAS,
    payload: empresas
  };
};

export const searchEmpresa = text => {
  return {
    type: SEARCH_EMPRESA,
    payload: text
  };
};
