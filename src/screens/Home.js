import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Clique na busca para iniciar.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;
