import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
// import {BleManager} from 'react-native-ble-plx';


export default class Seek extends Component {
  constructor() {
    super();
   
  }
  render() {
    return (
      <View style={styles.container}>
          <Text>Seek works!</Text>
      </View>
    );
  }


  scanAndConnect(){
    
  }

 
  componentWillMount() {
 
  }
  
  notifyUUID(num) {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginBottom:20,
    fontSize:20
  }
});
