import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Card from './UI/Card';
import CardSection from './UI/CardSection';

class Empresa extends Component {
  onSelectHandler = () => {
    this.props.redirect(this.props.empresa.id);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onSelectHandler}>
        <Card>
          <CardSection>
            <View style={styles.thumbnailContainerStyle}>
              <Image
                style={styles.thumbnailStyle}
                source={
                  this.props.empresa.image === null
                  ? require('../assets/blank.png')
                  : { uri: this.props.empresa.image }
                }
              />
            </View>
            <View style={styles.headerContentStyle}>
              <Text style={styles.headerTextStyle}>
                {this.props.empresa.name}
              </Text>
              <Text>{this.props.empresa.type}</Text>
              <Text>{this.props.empresa.country}</Text>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1, // flex: 1 and width: null to get the full width of device
    width: null
  }
});

const mapStateToProps = state => {
  return {
    empresas: state.empresas.empresas
  };
};

export default connect(mapStateToProps)(Empresa);
