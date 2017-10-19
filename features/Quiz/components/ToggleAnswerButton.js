import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//Stateless functional component, renders a white button to toggle between answer and question
const ToggleAnswerButton =(props) => (
  <View>
    <TouchableOpacity onPress={props.handlePress} style={styles.toggleQAContainer}>
      <Text style={styles.buttonText}>
        {props.showingAnswer
          ? "Show question"
          : "Show answer"
        }
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  toggleQAContainer: {
    backgroundColor: '#dedede',
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
  },
  buttonText: {
    textAlign: 'center'
  }
});

export default ToggleAnswerButton;
