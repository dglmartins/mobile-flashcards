import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import QuizButton from './QuizButton';

const QuizResults =(props) => (
  <View>
    <Text style={styles.finishedText}>Finished! You're score was:</Text>
    <Text style={styles.scoreText}> {Math.round(100*props.rightAnswerCount/props.questionCount)}%</Text>
    <QuizButton handlePress={props.handlePress} buttonText="Restart"/>
  </View>
);

const styles = StyleSheet.create({
  finishedText: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  scoreText: {
    marginTop: 20,
    fontSize: 50,
    textAlign: 'center',
    color: '#ea7a87',
    marginBottom: 25,

  }
});

export default QuizResults;
