import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView,Image} from 'react-native';
// import helm from './Artwork/Armor/Knight_Armor_free_icon'

export default class characterSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentWillMount() {
    // AsyncStorage.getItem('username').then((value) => {
    //   this.setState({
    //     username: value,
    //   });
    // });
  }

  render() {
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
      
        <SafeAreaView >
        
        <Text style={{
            color: 'white',
            textAlign:'center',
            fontFamily: 'IowanOldStyle-Roman'
        }}>Gear</Text>
          <FlatList
            style={{margin: 5}}
            data={gear}
            numColumns={3}
            renderItem={({item}) => (
              <View
                style={{
                  flexBasis: '30%',
                  margin: 5,
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  height: 130,
                  width: 130,
                }}>
                <Text style={styles.words}>{item.title}</Text>
                    <Image style={{width: '90%', height: '90%'}} resizeMode='contain'
                    source={require('./ios/assets/Artwork/Armor/red_Knight_Armor_free_icon.png')}
                     />
        {/* </View> */}
                {/* 
                { uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'}
                ios/assets/Artwork/Armor/red_Knight_Armor_free_icon.png
                Artwork/Armor/red_Knight_Armor_free_icon.png
                require('@expo/snack-static/react-native-logo.png' 
                require('./Artwork/Armor/Knight_Armor_free_icon.jpeg')
                */}
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
    // justifyContent: 'center',
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
  words:{
    color: 'white',
    textAlign:'center',
    fontFamily: 'IowanOldStyle-Roman'
    }
});
