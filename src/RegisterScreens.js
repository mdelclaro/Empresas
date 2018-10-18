import { Navigation } from 'react-native-navigation';

import Auth from './screens/Auth';
import Home from './screens/Home';
import Details from './screens/Details';

const registerScreens = () => {
  Navigation.registerComponent('empresas.Auth', () => Auth);
  Navigation.registerComponent('empresas.Home', () => Home);
  Navigation.registerComponent('empresas.Details', () => Details);
};

export default registerScreens;