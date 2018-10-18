import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class InputValidation extends Component {
  textChangeHandler = (value) => {
    this.props.onChange(this.props.name, value);
  }

  touchHandler = () => {
    this.props.onTouch(this.props.name);
  }

  render() {
    const { placeholder, error, ...rest } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <Icon
            name={Platform.OS === 'android' ? `md-${this.props.icon}` : `ios-${this.props.icon}`}
            size={25}
            color='#aaa'
            style={{ padding: 10 }}
          />
          <TextInput
            ref={this.props.myRef}
            underlineColorAndroid='transparent'
            onChangeText={this.textChangeHandler}
            onBlur={this.touchHandler}
            placeholder={placeholder}
            {...rest}
            style={[styles.input, this.props.style]}
          />
        </View>
        {error && <Text style={styles.errorMsg}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    //justifyContent: 'center'
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export default InputValidation;
