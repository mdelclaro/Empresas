import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  Image
} from 'react-native';
// import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonWithBackground from './UI/ButtonWithBackground';
import InputValidation from './UI/InputValidation';

class LoginForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido')
            .required('Insira o e-mail'),
          password: Yup.string()
            .min(6, 'Insira uma senha de 6 caracteres ou mais')
            .required('Insira a senha')
        })}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          isValid
        }) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
              >
                <Image
                  source={require('../assets/logo_home.png')}
                  style={styles.logo}
                />
                <Text style={styles.title}>
                  BEM-VINDO AO EMPRESAS
								</Text>
                <Text style={styles.description}>
                  Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.
                </Text>
                <View style={styles.inputContainer}>
                  <InputValidation
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    returnKeyType='next'
                    autoCorrect={false}
                    value={values.email}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    onSubmitEditing={() => this.input.focus()}
                    blurOnSubmit={false}
                    icon={'mail'}
                    name='email'
                    error={touched.email && errors.email}
                    style={styles.input}
                  />
                  <InputValidation
                    myRef={ref => (this.input = ref)}
                    placeholder="Senha"
                    autoCapitalize='none'
                    returnKeyType='send'
                    secureTextEntry
                    value={values.password}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    icon={'unlock'}
                    onSubmitEditing={handleSubmit}
                    name='password'
                    error={touched.password && errors.password}
                    style={styles.input}
                  />

                  { // Show Activity Indicator instead of button when loading
                    //!this.props.isLoading
                    1 > 0
                      ? <ButtonWithBackground
                        color='#57bbbc'
                        onPress={handleSubmit}
                        isDisabled={!isValid}
                      >
                        ENTRAR
                        </ButtonWithBackground>
                      : <ActivityIndicator />
                  }
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 160,
    resizeMode: 'stretch',
    marginBottom: 45
  },
  title: {
    textAlign: 'center',
    color: '#383743',
    backgroundColor: 'transparent',
    fontSize: 28,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    color: '#383743',
    backgroundColor: 'transparent',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 25
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  input: {
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderBottomColor: '#bbb'
  },
  inputContainer: {
    width: '80%'
  }
});

// const mapStateToProps = state => {
//   return {
//     isLoading: state.ui.isLoading
//   };
// };

//export default connect(mapStateToProps)(LoginForm);
export default LoginForm;
