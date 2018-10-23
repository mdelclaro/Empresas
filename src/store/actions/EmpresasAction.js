import { SET_EMPRESAS } from './types';
import { authGetAuth } from './AuthAction';

export const getEmpresas = () => {
  return dispatch => {
    dispatch(authGetAuth())
      .catch(() => {
        alert('Ocorreu algum problema. Tente novamente!');
      })
      .then(auth => {
        console.log('then -> ' + JSON.stringify(auth));
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
            throw (new Error());
          })
          .then(parsedRes => {
            console.log('parsedres -> \n' + JSON.stringify(parsedRes));
            const empresas = parsedRes.enterprises.map(empresa => {
              return {
                id: empresa.id,
                name: empresa.enterprise_name,
                description: empresa.description,
                country: empresa.country,
                type: empresa.enterprise_type.enterprise_type_name
              };
            });
            dispatch(setEmpresas(empresas));
          })
          .catch(err => {
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
