import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import startApp from '../App';

import LoginForm from '../components/LoginForm';

class Auth extends Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Login'
        }
      }
    };
  }

  submitHandler = (values) => {
    //this.props.onTryAuth(values, this.state.authMode);
    console.log(values);
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'motoapp.Screen1',
    //     options: {
    //       topBar: {
    //         title: {
    //           text: 'Screen1',
    //         }
    //       }
    //     }
    //   }
    // });
    startApp();
  }
  // TODO: Inserir icons nos text input
  render() {
    return (
      <View style={styles.container}>
        <LoginForm
          submitHandler={this.submitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebe9d7'
  }
});

export default Auth;
