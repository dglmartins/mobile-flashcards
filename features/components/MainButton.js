import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

//Stateless functional MainButton component used every time there is the common Main button in the app. Can receive extra styles, such as rendering it with a different backgroundColor
const MainButton =(props) => (
    <TouchableOpacity
      style={[styles.button, props.extraStyle]}
      onPress={props.handlePress}
    >
      <Text style={styles.buttonText}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#16aacb',
    justifyContent: 'center',
    borderRadius: 2,
    height: 30,
    width: 100,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1,
    marginBottom: 15
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  },
});

export default MainButton;
