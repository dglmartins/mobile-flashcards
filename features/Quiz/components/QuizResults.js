import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import MainButton from '../../components/MainButton';

//Stateless functional component, renders a finished message with a score in rounded percentage
const QuizResults =(props) => (
  <View>
    <Text style={styles.finishedText}>Finished! You're score was:</Text>
    <Text style={styles.scoreText}> {Math.round(100*props.rightAnswerCount/props.questionCount)}%</Text>
    <MainButton handlePress={props.handlePress} buttonText="Restart"/>
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
