import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {StatusBar} from 'react-native';

export default class characterSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 'false',
      viewingGear: null,
      equippedGear: {},
    };
  }

  componentDidMount() {
    this.setState({modalVisible: false});

    const equiped = {
      helm: {
        uri: require('./ios/assets/Artwork/Armor/Warrior-Armor-PNG-Photo.png'),
        metadata: {
          name: 'helm of swag',
          rarity: 'rare',
          stats: 'armor +10',
          uri: require('./ios/assets/Artwork/Armor/Warrior-Armor-PNG-Photo.png'),
        },
      },
      amulet: {
        uri: require('./ios/assets/Artwork/Armor/kisspng-olivia-benson-earring-necklace-charms-pendants-g-5af13249d36887.5708587315257564898659.png'),
        metadata: {
          name: 'fearless amulet',
          rarity: 'rare',
          stats: 'Blessing:fearless',
          uri: require('./ios/assets/Artwork/Armor/kisspng-olivia-benson-earring-necklace-charms-pendants-g-5af13249d36887.5708587315257564898659.png'),
        },
      },
      back: {
        uri: require('./ios/assets/Artwork/Armor/kisspng-cloak-robe-hood-clothing-cloak-5ada92617bf744.3176670515242737615078.png'),
        metadata: {
          name: 'cloak of shadows',
          rarity: 'unique',
          stats: '+10 defence',
          uri: require('./ios/assets/Artwork/Armor/kisspng-cloak-robe-hood-clothing-cloak-5ada92617bf744.3176670515242737615078.png'),
        },
      },
      left_weapon: {
        uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
        metadata: {
          name: 'bane sword',
          rarity: 'rare',
          stats: '+10 physical attack',
          uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
        },
      },
      right_weapon: {
        uri: require('./ios/assets/Artwork/Armor/Sword-PNG-Picture.png'),
        metadata: {
          name: 'swag sword',
          rarity: 'rare',
          stats: '+10 physical attack',
          uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
        },
      },
      chest: {
        uri: require('./ios/assets/Artwork/Armor/Armor-PNG-Download-Image.png'),
        metadata: {
          name: 'dark souls chest',
          rarity: 'rare',
          stats: '+10 defence',
          uri: require('./ios/assets/Artwork/Armor/Armor-PNG-Download-Image.png'),
        },
      },
      left_ring: {
        uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        metadata: {
          name: 'grandfather ring',
          rarity: 'rare',
          stats: '+10 defence',
          uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        },
      },
      right_ring: {
        uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        metadata: {
          name: 'grandfather ring',
          rarity: 'rare',
          stats: '+10 defence',
          uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        },
      },
    };
    this.saveEquipped(JSON.stringify(equiped));
    this.getEquipped();
    // console.log('this.equippedGear:'+JSON.stringify(this.equippedGear))
    // setTimeout(() => {
    //   console.log('got4:'+JSON.stringify(JSON.parse(this.equippedGear).helm))
    //   this.state.setState({
    //     equippedGear: JSON.parse(JSON.stringify({helm:"somehtine"}))
    //   })
    // }, 5000);
  }

  getEquipped() {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('equippedArmor');
        this.setState((state, props) => ({
          equippedGear: JSON.parse(jsonValue),
        }));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
    console.log('1got:' + JSON.stringify(this.equippedGear));
    getData();
    console.log('2got:' + JSON.stringify(this.equippedGear));
  }

  saveEquipped(value) {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        console.log('set' + JSON.jsonValue);
        await AsyncStorage.setItem('equippedArmor', value);
      } catch (e) {
        // saving error
      }
    };
    storeData(value);
  }
  toggleModal(visible, metaData) {
    console.log('got---->:' + metaData);
    this.setState({viewingGear: metaData});
    this.setState({modalVisible: visible});
    if(!this.state.modalVisible){
      StatusBar.setHidden(true);
    }
    
  }

  render() {
    const gearTitles = [
      'Amulet',
      'Helm',
      'back',
      'Left Weapon',
      'Chest',
      'Right Weapon',
      'Left ring',
      'Legs',
      'Right ring',
    ];
    const gear = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Left Shoulder',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Helm',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Right Shoulder',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Left Weapon',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Chest',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Right Weapon',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Left slot',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Legs',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Right Slot',
      },
    ];

    const Item = ({title}) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const renderItem = ({item}) => <Item title={item.title} />;

    return (
      <View style={styles.container}>
        {/* <View style={{backgroundColor:'red'}}> */}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View style={{ height:30, justifyContent:'center',alignSelf: 'flex-end'}}>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal(!this.state.modalVisible);
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
              <View style={{maxHeight:'70%'}}>
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
        {/* </View> */}
        <SafeAreaView>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'IowanOldStyle-Roman',
            }}>
            Gear
          </Text>
          <FlatList
            style={{margin: 5}}
            data={gear}
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
                {/* gearTitles[index]  */}
                <Text style={styles.words}>{gearTitles[index]}</Text>

                {this.state.equippedGear[
                  gearTitles[index].toString().toLowerCase().replace(' ', '_')
                ] && (
                  // <Text>{
                  //   JSON.stringify(this.state.equippedGear[gearTitles[index].toString().toLowerCase().replace(' ','_')].uri)
                  //   }</Text>
                  <TouchableOpacity
                    onPress={(item) => {
                      this.toggleModal(
                        true,
                        this.state.equippedGear[
                          gearTitles[index]
                            .toString()
                            .toLowerCase()
                            .replace(' ', '_')
                        ].metadata,
                      );
                    }}>
                    <Image
                      style={{width: '90%', height: '90%'}}
                      resizeMode="contain"
                      source={
                        this.state.equippedGear[
                          gearTitles[index]
                            .toString()
                            .toLowerCase()
                            .replace(' ', '_')
                        ].uri
                      }
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            keyExtractor={(item, index) => item.id}
            contentContainerStyle={styles.listView}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    margin: 'auto',
    height: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    height: 150,
    width: 150,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
  },
  words: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'IowanOldStyle-Roman',
  },
  modal: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  text: {
    color: 'orange',
  },
});
