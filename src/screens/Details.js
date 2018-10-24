import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

class Details extends Component {
  componentDidMount() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: this.props.name
        },
        visible: true,
        backButton: {
          color: 'white'
        },
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.image !== null
            ? <Image
              source={{ uri: this.props.image }}
              style={styles.image}
            />
            : <Text style={styles.noImageText}>Sem imagem disponível...</Text>
      }
        <Text style={styles.text}>
          {this.props.description}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    margin: 3,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    margin: 3,
    marginLeft: 10,
    marginRight: 10
  },
  noImageText: {
    fontSize: 14, 
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  }
});

export default Details;
