import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';


const DeckList = (props) => {
  return (
      <View style={styles.container}>
        {props.state.map((title) => (
          <Text key={title}>{title}</Text>
        ))}
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    state: Object.keys(state)
  };
}

export default connect(mapStateToProps)(DeckList);
