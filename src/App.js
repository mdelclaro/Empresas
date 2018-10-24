import { Platform } from 'react-native';
import { getImageSource } from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';

const startApp = () => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#ee4c77',
      },
      title: {
        color: 'white'
      }
    }
  });

  Promise.all([
    getImageSource(Platform.OS === 'android' ? 'md-search' : 'ios-search', 35, 'white'),
  ]).then(icons => {
    Navigation.setRoot({
      root: {
        stack: {
          id: 'stack',
          children: [
            {
              component: {
                id: 'Home',
                name: 'empresas.Home',
                options: {
                  topBar: {
                    visible: true,
                    rightButtons: [
                      {
                        id: 'rightButton',
                        icon: icons[0]
                      }
                    ],
                    title: {
                      text: 'ioasys',
                      fontSize: 22
                    }
                  }
                },
              }
            }
          ]
        }
      }
    });
  });
};

export default startApp;
