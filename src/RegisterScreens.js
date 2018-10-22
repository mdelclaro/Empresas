import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import Auth from './screens/Auth';
import Home from './screens/Home';
import Details from './screens/Details';

import createStore from './store/configureStore';

const store = createStore();

const registerScreens = () => {
  Navigation.registerComponentWithRedux('empresas.Auth', () => Auth, Provider, store);
  Navigation.registerComponentWithRedux('empresas.Home', () => Home, Provider, store);
  Navigation.registerComponentWithRedux('empresas.Details', () => Details, Provider, store);
};

export default registerScreens;
