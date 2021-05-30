import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDamage:0,
      userDefence:0,
      userLevel:0,
      userBlessings:[]
    };
  }

  componentWillMount() {
    this.getEquipped()
    
    
  }

  getEquipped() {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('equippedArmor');
        // console.log('1got:' + JSON.stringify(jsonValue));
        this.setState((state, props) => ({
          equippedGear: JSON.parse(jsonValue),
        }));
        this.calculateDamage()
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
    
    getData();

    console.log('2got:' + JSON.stringify(this.equippedGear));
  }

  calculateDamage(){
    equippedGear = this.state.equippedGear;
    Object.keys(equippedGear).forEach(gear =>{
      // console.log('Gear:'+gear)
      stats = equippedGear[gear].metadata.stats
      console.log('stats:'+equippedGear[gear].metadata.stats)
      
      if(stats.includes('attack')){
        var number = stats.match(/\d+/)[0];
        if(stats.includes('-')){
          this.setState({userDamage: number(this.state.userDamage - number)});
        }
        if(stats.includes('+')){
          console.log('add damage')
          let newNumber = Number(this.state.userDamage) + Number(number)
          this.setState({userDamage: Number(newNumber)});
        }
        
      }
      if(stats.includes('defence')){
        var number = stats.match(/\d+/)[0];
        if(stats.includes('-')){
          this.setState({userDamage: number(this.state.userDamage - number)});
        }
        if(stats.includes('+')){
          let newNumber = Number(this.state.userDamage) + Number(number)
          this.setState({userDefence: Number(newNumber)});
        }
      }

      if(stats.includes('Blessing')){
        console.log('has blessing')
        let blessing = stats.substring(stats.indexOf(":")+1);
        console.log('blessing:'+blessing)
        let userBlessingsL = Array.from(this.state.userBlessings);
        console.log('userBlessingsL:'+userBlessingsL)
        userBlessingsL.push(blessing)
        console.log('userBlessingsL:'+userBlessingsL)

        this.setState({userBlessings: userBlessingsL});
      }
      
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Level: {this.state.userLevel}</Text>
        <Text style={styles.text}>Damage: {this.state.userDamage}</Text>
        <Text style={styles.text}>Defence: {this.state.userDefence}</Text>
        <Text style={styles.text}>Blessings: {this.state.userBlessings}</Text>

        {/* <Text>Username:</Text>
        <TextInput
          style={{height: 40, backgroundColor: 'azure', fontSize: 20}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.storeData(text, 'username')}
          value={this.state.username}
        />
        <Button
          color="red"
          title="clickMe"
          onPress={() => this.getMyStringValue('username')}></Button> */}
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'white',
  }
});
