import React from 'react';
import { StyleSheet,
  Text,
  View,
} from 'react-native';

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
