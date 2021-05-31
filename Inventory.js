import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {StatusBar} from 'react-native';

// import {BleManager} from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      viewingGear: null,
      inventory: [],
    };
  }

  componentDidMount() {
    this.setState({modalVisible: false});
    this.setInventory();
    this.getInventory();
  }

  getInventory() {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('inventory');
        console.log(Array.from(jsonValue));
        this.setState((state, props) => ({
          inventory: JSON.parse(jsonValue),
        }));

        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {}
    };
    getData();
  }

  setInventory() {
    
    const gear = [
      {
        type: 'Helm',
        name: 'helm of swag',
        rarity: 'rare',
        stats: 'armor +10',
        uri: require('./ios/assets/Artwork/Armor/Warrior-Armor-PNG-Photo.png'),
        equipped:false,
        id:'helm_of_swag'
      },
      {
        type: 'Amulet',
        name: 'fearless amulet',
        rarity: 'rare',
        stats: 'Blessing:fearless',
        uri: require('./ios/assets/Artwork/Armor/kisspng-olivia-benson-earring-necklace-charms-pendants-g-5af13249d36887.5708587315257564898659.png'),
        equipped:false,
        id:'fearless_amulet'
      },
      {
        type: 'Back',
        name: 'cloak of shadows',
        rarity: 'unique',
        stats: '+10 defence',
        uri: require('./ios/assets/Artwork/Armor/kisspng-cloak-robe-hood-clothing-cloak-5ada92617bf744.3176670515242737615078.png'),
        equipped:false,
        id:'cloak_of_shadows'
      },
      {
        type: 'Weapon',
        name: 'bane sword',
        rarity: 'rare',
        stats: '+10 physical attack',
        uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
        equipped:false,
        id:'bane_sword'
      },
      {
        type: 'Weapon',
        name: 'swag sword',
        rarity: 'rare',
        stats: '+10 physical attack',
        uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
        equipped:false,
        id:'swag_sword'
      },
      {
        type: 'Chest',
        name: 'dark souls chest',
        rarity: 'rare',
        stats: '+10 defence',
        uri: require('./ios/assets/Artwork/Armor/Armor-PNG-Download-Image.png'),
        equipped:false,
        id:'dark_souls_chest'
      },
      {
        type: 'Ring',
        name: 'grandfather ring',
        rarity: 'rare',
        stats: '+10 defence',
        uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        equipped:false,
        id:'grandfather_ring'
      },
      {
        type: 'Ring',
        name: 'grandfather ring',
        rarity: 'rare',
        stats: '+10 defence',
        uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        equipped:false,
        id:'grandfather_ring1'
      },
      {
        type: 'Ring',
        uri: require('./ios/assets/Artwork/Armor/Ring-PNG-Clipart.png'),
        name: 'ruby ring',
        rarity: 'rare',
        stats: '+10 defence',
        equipped:'left_ring',
        id:'ruby_ring'
      },
    ];
    console.log('trying to set!')
    const storeData = async (gear) => {
      try {
        const jsonValue = gear;

        await AsyncStorage.setItem('inventory', JSON.stringify(gear)).then(
          (val) => {
            console.log('inventory saved in inventory.js:' + JSON.stringify(gear));
          },
        );
      } catch (e) {
        console.log('inventory NOT saved in inventory.js:' + JSON.stringify(gear));
        // saving error
      }
    };
    storeData(gear);
  }
  toggleModal(visible, metaData) {
    this.setState({viewingGear: metaData});
    this.setState({modalVisible: visible});
    if (!this.state.modalVisible) {
      StatusBar.setHidden(true);
    }
  }

  render() {
    let dataSource = this.state.inventory;
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modal}>
            <View
              style={{
                height: 30,
                justifyContent: 'center',
                alignSelf: 'flex-end',
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal(!this.state.modalVisible, null);
                }}>
                <Icon name="close" size={30} color="#4F8EF7" />
                {/* <Text style={styles.text}>Close Modal</Text> */}
              </TouchableHighlight>
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              {/* {this.state.viewingGear?.uri &&  */}
              <Text style={styles.text}>
                {this.state.viewingGear ? this.state.viewingGear?.name : null}
              </Text>
              <View style={{maxHeight: '70%'}}>
                <Image
                  style={{width: '90%', height: '90%'}}
                  resizeMode="contain"
                  source={this.state.viewingGear?.uri}
                />
              </View>

              <Text style={styles.text}>
                {this.state.viewingGear ? this.state.viewingGear?.rarity : null}
              </Text>
              <Text style={styles.text}>
                {this.state.viewingGear ? this.state.viewingGear?.stats : null}
              </Text>
            </View>
          </View>
        </Modal>
        <SafeAreaView>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'IowanOldStyle-Roman',
            }}>
            Inventory
          </Text>
          <FlatList
            style={{margin: 5}}
            data={this.state.inventory}
            numColumns={3}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexBasis: '30%',
                  margin: 5,
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  height: 130,
                  width: 130,
                  overflow: 'hidden',
                }}>
                {/* <Text style={styles.text}>{this.state.inventory}</Text>
                <Text style={styles.words}>{JSON.stringify(item)}</Text> */}

                <TouchableOpacity style={{height:'100%',width:'100%', backgroundColor:'red'}}
                  onPress={() => {
                    this.toggleModal(true, item);
                  }}>
                  <Image
                    style={{width: '90%', height: '90%'}}
                    resizeMode="contain"
                    source={item.uri}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item}
            contentContainerStyle={styles.listView}
          />
        </SafeAreaView>
      </View>
    );
  }

  scanAndConnect() {}

  componentWillMount() {}

  notifyUUID(num) {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginBottom: 20,
    fontSize: 20,
  },
  text: {
    color: 'orange',
  },
  words: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'IowanOldStyle-Roman',
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
