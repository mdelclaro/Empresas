import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Keyboard, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { getImageSource } from 'react-native-vector-icons/Ionicons';

import { getEmpresas, searchEmpresa } from '../store/actions/EmpresasAction';

import Empresa from '../components/Empresa';

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
    start: true,
    searched: false,
    blankInput: true
  };

  componentDidMount() {
    this.props.onLoadEmpresas();
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'rightButton') {
      if (this.state.searched) {
        this.setState({
          start: false,
          searched: false
        });
      } else {
        this.setState({
          start: false,
          searched: true
        });
      }
      this.renderIcons();
    }
  }

  keyboardDidHide = () => {
    this.setState({
      searched: false
    });
  }

  searchEmpresaHandler = text => {
    if (text === '') {
      this.setState({
        blankInput: true
      });
    } else {
      this.setState({
        blankInput: false
      });
    }
    this.props.onSearchEmpresa(text);
  }

  redirectHandler = (id) => {
    const empresa = this.props.empresas.filter(item => {
      return item.id === id;
    });
    const { name, image, description } = empresa[0];
    console.log(name, image, description);
    Navigation.push('stack', {
      component: {
        name: 'empresas.Details',
        passProps: {
          name,
          image,
          description
        },
        options: {
          topBar: {
            title: name
          }
        }
      }
    });
  }

  renderIcons() {
    let androidIcon;
    let iosIcon;

    if (this.state.searched) {
      androidIcon = 'md-close';
      iosIcon = 'ios-close';

      getImageSource(
        Platform.OS === 'android' ? androidIcon : iosIcon, 30, 'white')
        .then(icon => {
          Navigation.mergeOptions('Home', {
            topBar: {
              title: {
                component: {
                  name: 'empresas.Input',
                  passProps: {
                    searchEmpresaHandler: this.searchEmpresaHandler,
                    myRef: ref => (this.input = ref),
                    blank: true
                  }
                },
              },
              rightButtons: [{
                icon,
                id: 'rightButton'
              }]
            }
          });
        });
    } else {
      androidIcon = 'md-search';
      iosIcon = 'ios-search';

      this.input.clear();

      getImageSource(
        Platform.OS === 'android' ? androidIcon : iosIcon, 30, 'white')
        .then(icon => {
          Navigation.mergeOptions('Home', {
            topBar: {
              title: {
                text: 'ioasys',
                fontSize: 22
              },
              rightButtons: [{
                icon,
                id: 'rightButton'
              }]
            }
          });
        });
      this.props.onSearchEmpresa('');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.start
            ? <Text>
              Clique na busca para iniciar.
              </Text>
            : <FlatList
              data={
                this.state.blankInput
                  ? this.props.empresas
                  : this.props.filteredEmpresas
              }
              renderItem={empresa => (
                <Empresa
                  empresa={empresa.item}
                  redirect={(this.redirectHandler)}
                />
              )}
              keyExtractor={empresa => empresa.id.toString()}
              keyboardShouldPersistTaps='always'
            />
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
});

const mapStateToProps = state => {
  return {
    empresas: state.empresas.empresas,
    filteredEmpresas: state.empresas.filteredEmpresas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadEmpresas: () => dispatch(getEmpresas()),
    onSearchEmpresa: text => dispatch(searchEmpresa(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
