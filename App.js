import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput,Alert} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {RNCamera} from 'react-native-camera';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Home from './Home'
import Battle from './Battle'

// function blueToothScreen() {
  
// }

// function home() {
//   function handleInput(text1, type){
//     // storeData(text1)
//     // const [text1s, setText] = React.useState('');
//     // return setText(text1)
//     _storeData = async () => {
//       try {
//         await AsyncStorage.setItem(type, data);
//       } catch (error) {
//         // Error saving data
//       }
//     };
   
//   }

  function getStorage() {
    console.log('hi')
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(type);
        if (value !== null) {
          // Our data is fetched successfully
          return value
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
  }
  // onPressStartTheGame(){
  //   console.log("Pushed button Start the Game!")
  //   //dispatch({ type: ADD_PLAYER_NAME, playerNumber: 5, playerName: "Sandro" })
  // }
  
  // return (
  //   <View style={styles.container}>
  //     <Text>Username:</Text>
  //     <TextInput  
  //                   style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
  //                   placeholder="Type here to translate!"  
  //                   onChangeText={(text) => handleInput({text},'username')}  
  //               />  
  //     {/* <Text>Level:</Text>
  //     <Text>XP:</Text> */}
  //     <Button title="clickMe" onClick={() => this.handleClick}></Button>
  //   </View>
  // );
// }

function BarcodeScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>State: {this.state.bleState}</Text>
        <Button onPress={this.clicked} title="Click Me!" color="#841584" /> */}
      <RNCamera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          width: '100%',
        }}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        onBarCodeRead={(barcode) =>
          // this.onBarCodeRead.bind(this)
          console.log('barcode:' + barcode.data)
        }></RNCamera>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends Component {
  // manager = new BleManager()
  // manager

  constructor() {
    super();
    
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Battle" component={Battle} />
        </Tab.Navigator>
      </NavigationContainer>
      ////////////////////

      ////////////////
    );
  }

  storeData(type, data) {
    console.log('made it here')
    // create a function that saves your data asyncronously
    _storeData = async () => {
      try {
        await AsyncStorage.setItem(type, data);
      } catch (error) {
        // Error saving data
      }
    };
  }

  getData(type) {
    // fetch the data back asyncronously
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(type);
        if (value !== null) {
          // Our data is fetched successfully
          return value
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
  }

  clicked() {
    console.log('Clicked!');
  }

  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach((barcode) => console.warn(barcode.data));
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
