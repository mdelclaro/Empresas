import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';

import { getEmpresas } from '../store/actions/EmpresasAction';

import Card from '../components/UI/Card';
import CardSection from '../components/UI/CardSection';

class Home extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'ioasys'
        },
        visible: true
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    searching: false
  };

  componentDidMount() {
    this.props.onLoadEmpresas();
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'searchButton') {
      Navigation.mergeOptions('Home', {
        topBar: {
          title: {
            component: {
              name: 'empresas.Input',
              alignment: 'center',
            },
          }
        }
      });
      this.setState({
        searching: true
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          !this.state.searching
            ? <Text>
              Clique na busca para iniciar.
              </Text>
            : <Card>
              <CardSection>
                <View style={styles.thumbnailContainerStyle}>
                  <Image
                    style={styles.thumbnailStyle}
                    source={{ uri: require('../assets/logo_home.png') }}
                  />
                </View>
                <View style={styles.headerContentStyle}>
                  <Text style={styles.headerTextStyle}>
                    Titulo teste
                  </Text>
                  <Text>Tipo teste</Text>
                  <Text>Pais teste</Text>
                </View>
              </CardSection>
            </Card>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1, // flex: 1 and width: null to get the full width of device
    width: null
  }
});

const mapStateToProps = state => {
  return {
    empresas: state.empresas.empresas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadEmpresas: () => dispatch(getEmpresas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
