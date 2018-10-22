import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { logInUser, authAutoSignIn } from '../store/actions/index';

import LoginForm from '../components/LoginForm';

class Auth extends Component {
  componentDidMount() {
    console.log('montou');
    this.props.onAutoSignIn();
  }

  submitHandler = (values) => {
    this.props.onTryAuth(values.email, values.password);
  }
  
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

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (email, password) =>
      dispatch(logInUser(email, password)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};

export default connect(null, mapDispatchToProps)(Auth);
