import React, { Component } from 'react';
import { View } from 'react-native';

import startApp from '../App';

import LoginForm from '../components/LoginForm';

class Details extends Component {
  static get options() {
    return { 
      topBar: { 
        title: { 
          text: 'Detalhes' 
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

  render() {
    return (
      <View>
        <LoginForm
          onSwitchAuthMode={this.switchAuthModeHandler}
          submitHandler={this.submitHandler}
        />
      </View>
    );
  }
}

export default Details;
