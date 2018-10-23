import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import UiReducer from './reducers/UIReducer';
import EmpresasReducer from './reducers/EmpresasReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    ui: UiReducer,
    empresas: EmpresasReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
