import React from 'react';
import { StyleSheet,
  Text,
  View,
} from 'react-native';

const QACard =(props) => (
  <View style={styles.questionAnswerContainer}>
    {props.showingAnswer
      ? <Text style={styles.questionText}>{props.answer}</Text>
      : <Text style={styles.questionText}>{props.question}</Text>
    }
  </View>
);

const styles = StyleSheet.create({
  questionAnswerContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#fff',
    height: 200,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1,
    marginRight: 30,
    marginLeft: 30

  },
  questionText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export default QACard;
