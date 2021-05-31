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
      viewingGear: {},
      equippedGear: {},
      inventory: [],
    };
  }

  getInventory() {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('inventory');
        this.setState((state, props) => ({
          inventory: JSON.parse(jsonValue),
        }));

        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // console.log('e!' + e);
      }
    };
    getData();
  }

  componentDidMount() {
    this.setState({modalVisible: false});
    this.setState({modalSwitchVisible: false});
    const equiped = {
      // helm: {
      //   type: 'helm',
      //   name: 'helm of swag',
      //   rarity: 'rare',
      //   stats: 'armor +10',
      //   uri: require('./ios/assets/Artwork/Armor/Warrior-Armor-PNG-Photo.png'),
      //   equipped: 'helm',
      //   id: 'helm_of_swag',
      // },
      // amulet: {
      //   type: 'amulet',
      //   name: 'fearless amulet',
      //   rarity: 'rare',
      //   stats: 'Blessing:fearless',
      //   uri: require('./ios/assets/Artwork/Armor/kisspng-olivia-benson-earring-necklace-charms-pendants-g-5af13249d36887.5708587315257564898659.png'),
      //   equipped: 'amulet',
      //   id: 'fearless_amulet',
      // },
      // back: {
      //   type: 'back',
      //   name: 'cloak of shadows',
      //   rarity: 'unique',
      //   stats: '+10 defence',
      //   uri: require('./ios/assets/Artwork/Armor/kisspng-cloak-robe-hood-clothing-cloak-5ada92617bf744.3176670515242737615078.png'),
      //   equipped: 'back',
      //   id: 'cloak_of_shadows',
      // },
      // left_weapon: {
      //   type: 'weapon',
      //   name: 'bane sword',
      //   rarity: 'rare',
      //   stats: '+10 physical attack',
      //   uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
      //   equipped: 'left_weapon',
      //   id: 'bane_sword',
      // },
      // right_weapon: {
      //   type: 'weapon',
      //   name: 'swag sword',
      //   rarity: 'rare',
      //   stats: '+10 physical attack',
      //   uri: require('./ios/assets/Artwork/Armor/Sword-PNG-File.png'),
      //   equipped: 'right_weapon',
      //   id: 'swag_sword',
      // },
      // chest: {
      //   type: 'chest',
      //   name: 'dark souls chest',
      //   rarity: 'rare',
      //   stats: '+10 defence',
      //   uri: require('./ios/assets/Artwork/Armor/Armor-PNG-Download-Image.png'),
      //   equipped: 'chest',
      //   id: 'dark_souls_chest',
      // },
      left_ring: {
        type: 'ring',
        name: 'grandfather ring',
        rarity: 'rare',
        stats: '+10 defence',
        uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
        equipped: 'left_ring',
        id: 'grandfather_ring',
      },
      // right_ring: {
      //   type: 'ring',
      //   name: 'grandfather ring',
      //   rarity: 'rare',
      //   stats: '+10 defence',
      //   uri: require('./ios/assets/Artwork/Armor/kisspng-ring-http-cookie-silver-jewellery-platinum-medieval-swords-renaissance-clothing-shields-he-5b6d4ccc2294e9.0120461815338897401417.png'),
      //   equipped: 'right_ring',
      //   id: 'grandfather_ring1',
      // },
    };
    this.saveEquipped(JSON.stringify(equiped));
    this.getEquipped();
    this.getInventory();
  }

  getEquipped() {
    const getData = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem('equippedArmor');

        this.setState((state, props) => ({
          equippedGear: JSON.parse(jsonValue),
        }));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }

  saveEquippedToState(input) {
    this.setState((state, props) => ({
      equippedGear: JSON.parse(input),
    }));
    // console.log('equipped state should be:'+input)
  }

  saveEquipped(value) {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('equippedArmor', value);
      } catch (e) {
        // saving error
      }
    };
    storeData(JSON.parse(JSON.stringify(value)));
    this.saveEquippedToState(value);
  }
  toggleModal(visible, metaData) {
    if (metaData) {
      this.setState({viewingGear: metaData});
    }
    this.setState({modalVisible: visible});
    if (!this.state.modalVisible) {
      StatusBar.setHidden(true);
    }
  }

  toggleSwitchModal(visible) {
    this.setState({modalSwitchVisible: visible});
    if (!this.state.modalVisible) {
      StatusBar.setHidden(true);
    }
  }

  replaceEquipped(equipType) {
    // console.log('viewingGear:'+JSON.stringify(this.state.viewingGear))
    this.setState({modalVisible: false});
    this.setState({modalSwitchVisible: true});

    let equipTypeCopy = equipType.toString().toLowerCase().replace(' ', '_');
    if (equipTypeCopy?.includes('_')) {
      equipTypeCopy = equipTypeCopy.split('_')[1] ? equipTypeCopy.split('_')[1] : sequipTypeCopy ;
      equipTypeCopy = equipTypeCopy.toLowerCase()
    }
    let viewGearTypeCopy = this.state.viewingGear.type;
    if (viewGearTypeCopy?.includes('_')) {
      viewGearTypeCopy = viewGearTypeCopy.split('_')[1] ? viewGearTypeCopy.split('_')[1] : viewGearTypeCopy
      viewGearTypeCopy=viewGearTypeCopy.toLowerCase()
    }
    let typeFilterdInventory = this.state.inventory.filter((inventoryItem) => {
      console.log('inventoryItem.type-->:' + JSON.stringify(inventoryItem.type));
      console.log(
        'equipTypeCopy---<>:' +
        equipTypeCopy,
      );
      console.log(
        'viewGearTypeCopy:<><>' + viewGearTypeCopy,
      );

      if (
        inventoryItem?.type
          .toString()
          .toLowerCase()
          .replace(' ', '_')
          .includes(equipTypeCopy)
      ) {
        return inventoryItem;
      }
      if (
        inventoryItem?.type
          .toString()
          .toLowerCase()
          .replace(' ', '_')
          .includes(viewGearTypeCopy)
      ) {
        return inventoryItem;
      }
    });
    let viewingGearCopy = JSON.parse(JSON.stringify(this.state.viewingGear));
    viewingGearCopy.equipped = equipType
      ? equipType
      : this.state.viewingGear.type;
    this.setState((state, props) => ({
      viewingGear: viewingGearCopy,
    }));

    // console.log('available options:'+JSON.stringify(typeFilterdInventory))
    this.setState({typeFilterdInventory: typeFilterdInventory});
  }
  ensureEquipped(equipThis) {
    // console.log('equipThis:'+JSON.stringify(equipThis))
    // console.log('this.state.equippedGea:'+JSON.stringify(this.state.equippedGear))
  }
  unequippedById(idToUnequip) {
    let unequipType = idToUnequip.type;
    let newEquippedArray = Object.keys(this.state.equippedGear).map(
      (key, index) => {
        if (!(this.state.equippedGear[key].id == idToUnequip.id)) {
          return this.state.equippedGear[key];
        } else {
        }
      },
    );

    let newEquippedObject = {};
    newEquippedArray.forEach((item) => {
      if (item) {
        newEquippedObject[item.type] = item;
      }
    });

    this.setState((state, props) => ({
      equippedGear: newEquippedObject,
    }));
    return;
  }
  setInventory(input) {
    const storeData = async (input) => {
      try {
        const jsonValue = input;

        await AsyncStorage.setItem(
          'inventory',
          JSON.stringify(input),
        ).then((val) => {});
      } catch (e) {
        // saving error
      }
    };
    storeData(input);
  }
  equipById(idToEquip) {
    //1) Equip the item in the inventory
    //2) Update the equippedItems
    //3) Remove the equipped flag from the old item in the inventory
    let someNewArray = JSON.parse(JSON.stringify(this.state.inventory));
    let newInventory = someNewArray.map((inventoryItemOrig, index) => {
      let inventoryItem = new Object(inventoryItemOrig);
      inventoryItem = JSON.parse(JSON.stringify(inventoryItem));
      if (inventoryItem.id === idToEquip) {
        inventoryItem.equipped = this.state.viewingGear.equipped;
        let newEquipped = JSON.parse(JSON.stringify(this.state.equippedGear));
        // let keyType = this.state.viewingGear.equipped ? this.state.viewingGear.equipped :
        newEquipped[
          this.state.viewingGear.equipped.toLowerCase()
        ] = inventoryItem;
        this.saveEquipped(JSON.stringify(newEquipped));
      }
      if (inventoryItem.id === this.state.viewingGear.id) {
        inventoryItem.equipped = 'false';
      }
      // inventoryItem.equipped = false;
      return inventoryItem;
    });

    this.setInventory(newInventory);

    return;
  }

  render() {
    const gearTitles = [
      'Amulet',
      'Helm',
      'Back',
      'Left Weapon',
      'Chest',
      'Right Weapon',
      'Left Ring',
      'Legs',
      'Right ring',
    ];
    const gear = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Amulet',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Helm',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Back',
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
        title: 'Left Rlot',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Legs',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Right Ring',
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
        {/* REPLACING modal */}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalSwitchVisible}
          onRequestClose={() => {}}>
          <View style={styles.modal}>
            <Text style={styles.text}>Replacing</Text>
            <View
              style={{
                width: '100%',
                height: 30,
                justifyContent: 'space-between',
                flexDirection: 'row',
                display: 'flex',
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.toggleSwitchModal(!this.state.modalSwitchVisible);
                }}>
                <Icon name="close" size={30} color="#4F8EF7" />
                {/* <Text style={styles.text}>Close Modal</Text> */}
              </TouchableHighlight>
            </View>

            <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
              <FlatList
                style={{margin: 5}}
                data={this.state.typeFilterdInventory}
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
                    {/* <Text style={styles.text}>
                      {JSON.stringify(this.state.viewingGear)}
                    </Text> */}
                    {item?.equipped != false && item?.equipped != 'false' && (
                      <Icon
                        name="reload1"
                        size={30}
                        color="#4F8EF7"
                        style={{maxHeight: 10}}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        this.toggleSwitchModal(!this.state.modalSwitchVisible);
                        // this.unequippedById(this.state.viewingGear);
                        this.equipById(item.id);
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
            </View>
          </View>
        </Modal>
        {/* view modal */}

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modal}>
            <Text style={styles.text}>Inspecting</Text>
            <View
              style={{
                width: '100%',
                height: 30,
                justifyContent: 'space-between',
                flexDirection: 'row',
                display: 'flex',
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.toggleModal(!this.state.modalSwitchVisible);
                  this.replaceEquipped();
                }}>
                <Icon name="reload1" size={30} color="#4F8EF7" />
                {/* <Text style={styles.text}>Close Modal</Text> */}
              </TouchableHighlight>
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
                {!this.state.equippedGear[
                  gearTitles[index].toString().toLowerCase().replace(' ', '_')
                ] && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'blue',
                      height: '100%',
                      width: '100%',
                    }}
                    onPress={(item2) => {
                      this.toggleModal(!this.state.modalSwitchVisible);
                      this.replaceEquipped(item.title);
                      // this.toggleModal(
                      //   true,
                      //   this.state.equippedGear[
                      //     gearTitles[index]
                      //       .toString()
                      //       .toLowerCase()
                      //       .replace(' ', '_')
                      //   ],
                      // );
                    }}></TouchableOpacity>
                )}

                {
                  (this.ensureEquipped(
                    this.state.equippedGear[
                      gearTitles[index]
                        .toString()
                        .toLowerCase()
                        .replace(' ', '_')
                    ],
                  ),
                  this.state.equippedGear[
                    gearTitles[index].toString().toLowerCase().replace(' ', '_')
                  ] && (
                    <TouchableOpacity
                      style={{
                        // backgroundColor: 'red',
                        height: '100%',
                        width: '100%',
                      }}
                      onPress={(item) => {
                        this.toggleModal(
                          true,
                          this.state.equippedGear[
                            gearTitles[index]
                              .toString()
                              .toLowerCase()
                              .replace(' ', '_')
                          ],
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
                  ))
                }
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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'orange',
  },
});
