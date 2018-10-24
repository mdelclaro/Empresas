import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

class SearchInput extends Component {
  searchEmpresaHandler = (text) => {
    this.props.searchEmpresaHandler(text);
  }

  render() {
    return (
        <TextInput
          ref={this.props.myRef}
          placeholder='Pesquisar'
          onChangeText={this.searchEmpresaHandler}
          style={styles.input}
        />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SearchInput;
