import React from 'react';
import { StyleSheet,
  Text,
  View,
} from 'react-native';

//Stateless functional component, renders at the left corner of screen, the number of the question out of how many questions
const QuizProgress =(props) => (
  <View style={styles.progressContainer}>
    <Text style={styles.progressText}>
      {props.questionNumber} / {props.questionCount}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  progressContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 25,
  },
  progressText: {
    fontWeight: 'bold',
  },
});

export default QuizProgress;
