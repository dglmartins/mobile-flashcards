import React from 'react';
import { StyleSheet,
  TextInput,
  View,
  Platform
} from 'react-native';

const InputField =(props) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={props.inputValue}
      onChangeText={(text) => props.handleTextChange(text)}
      placeholder={props.placeholder}
      underlineColorAndroid= '#dedede'
      multiLine={true}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
    backgroundColor: '#fff',
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
    shadowOpacity: 1,
    paddingBottom: 5,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 1,
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Platform.OS === 'ios' ? '#dedede' : 'white',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 13
  },
});

export default InputField;
