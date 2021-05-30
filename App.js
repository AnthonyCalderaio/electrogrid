import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import {RNCamera} from 'react-native-camera';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/AntDesign';


import Home from './Home';
import Battle from './Battle';
import Seek from './Seek';
import characterSummary from './character-summary';
import Inventory from './Inventory'

console.disableYellowBox = true;
function getStorage() {
  console.log('hi');
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(type);
      if (value !== null) {
        // Our data is fetched successfully
        return value;
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
}

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
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name.toString() === 'Home') {
                iconName = 'home'
              }
              if (route.name.toString() === 'Seek') {
                iconName = 'addusergroup'
              }
              if (route.name.toString() === 'Gear') {
                iconName = 'skin'
              }
              if (route.name.toString() === 'Inventory') {
                iconName = 'appstore1'
              }
              return <Icon name={iconName} size={size} color={color} />;
            }})}
            tabBarOptions={{
              activeTintColor:'orange',
              inactiveTintColor:'white',
              labelStyle: {fontSize: 12},
              tabStyle: {width: 100},
              style: {backgroundColor: 'gray', color:'orange'},
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Seek" component={Seek} />
            <Tab.Screen name="Inventory" component={Inventory} />
            <Tab.Screen name="Gear" component={characterSummary} />
            {/* <Tab.Screen name="Battle" component={Battle} /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>

      ////////////////////

      ////////////////
    );
  }

  storeData(type, data) {
    console.log('made it here');
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
          return value;
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
