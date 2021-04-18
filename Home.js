import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('username').then((value) => {
      this.setState({
        username: value,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Username:</Text>
        <TextInput
          style={{height: 40, backgroundColor: 'azure', fontSize: 20}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.storeData(text, 'username')}
          value={this.state.username}
        />
        <Button
          color="red"
          title="clickMe"
          onPress={() => this.getMyStringValue('username')}></Button>
      </View>
    );
  }

  storeData(value, key) {
    try {
      this.setState({key: value});
      AsyncStorage.setItem(key, value);
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  }

  getMyStringValue = async (key) => {
    try {
      console.log('keyinput:' + key);
      value = await AsyncStorage.getItem(key);
      alert('value:' + value);
      return value;
    } catch (e) { }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
