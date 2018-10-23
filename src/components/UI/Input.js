import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const input = props => (
  <View style={styles.input}>
    <TextInput

      underlineColorAndroid='transparent'
      style={{ color: 'black', borderBottomWidth: 1, borderColor: 'black' }}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  }
});

export default input;
