import { Navigation } from 'react-native-navigation';

const startApp = () => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: 'black',
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
                        id: 'searchButton',
                        icon: icons[0]
                      }
                    ],
                    title: {
                      text: 'ioasys'
                    }
                  }
                },
              }
            },
            {
              component: {
                id: 'Details',
                name: 'empresas.Details',
              },
            }
          ]
        }
      }
    });
  });
}


export default startApp;
