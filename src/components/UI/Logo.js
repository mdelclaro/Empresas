import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image
    style={styles.image}
    source={require('../../assets/logo_nav.png')}
  />
);

const styles = StyleSheet.create({
  image: {
    resizeMode: 'center',
    margin: 10
  }
});

export default Logo;
