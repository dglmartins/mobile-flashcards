import React from 'react';
import { StyleSheet, Text } from 'react-native';

//Stateless functional component, renders at the left corner of screen, the number of the question out of how many questions
const Instructions =(props) => (
  <Text style={styles.instructions}>
    {props.showingAnswer
      ? 'Mark your guess as Correct/Incorrect'
      : 'Take a guess then click Show Answer'
    }
  </Text>
);

const styles = StyleSheet.create({
  instructions: {
    alignSelf: 'center',
    marginTop: 15,
  }
});

export default Instructions;
