import React from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const ToggleAnswerButton =(props) => (
  <View style={styles.toggleQAContainer}>
    <TouchableOpacity onPress={props.handlePress}>
      <Text>
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
    alignSelf: 'center',
    marginTop: 30,
    marginRight: 15,
    marginLeft: 15,
  }
});

export default ToggleAnswerButton;
