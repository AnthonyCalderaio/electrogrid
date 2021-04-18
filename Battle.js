import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';
import {BleManager} from 'react-native-ble-plx';


export default class Battle extends Component {
  constructor() {
    super();
    const manager = (this.manager = new BleManager());
    this.state = {bleState: null, deviceList:[]};
    this.prefixUUID = 'f000aa';
    this.suffixUUID = '-0451-4000-b000-000000000000';
    this.sensors = {
      0: 'Temperature',
      1: 'Accelerometer',
      2: 'Humidity',
      3: 'Magnetometer',
      4: 'Barometer',
      5: 'Gyroscope',
    };
    //  alert('manager:',manager)
     this.scanAndConnect(manager)
    // this.manager.setLogLevel(LogLevel.Verbose);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>{this.state.info}</Text> */}
        { this.state.deviceList.map((item, key)=>(
         <Text style={styles.list} key={key}> { item } </Text>)
         )}
      </View>
    );
  }

  // {Object.keys(this.state.deviceList).map((key) => {
  //   // return(
  //   //   <Text>key</Text>
  //   // )
  //   // return (
  //   //   <Text key={key}>
  //   //     {this.sensors[key] +
  //   //       ': ' +
  //   //       (this.state.values[this.notifyUUID(key)] || '-')}
  //   //   </Text>
  //   // );
  // })}


  scanAndConnect(){
    this.manager.startDeviceScan(null, null, (error, device) => {
      console.log('Scanning...');
      this.setState({bleState: 'Scanning...'});
      if(device != null){
        console.log(device.id);
            if (
        device.name === 'TI BLE Sensor Tag' ||
        device.name === 'SensorTag' ||
        device.name
      ) {

        if(device.name.includes('Anthony')){
          device.connect()
          .then((device) => {
            console.log('connected!')
            response = 'hi'
            // console.log('response:',device)
              // return device.discoverAllServicesAndCharacteristics()
          })
        }
        

        let list = this.state.deviceList
        list.push(device.name)
        this.setState({
          deviceList: list
        })
        
        // deviceList.push(device.name)

        console.log('devicelist:'+list)

      }


      }
      
    })
  }

  // onBarCodeRead(scanResult) {
  //   console.warn(scanResult.type);
  //   console.warn(scanResult.data);
  //   return;
  // }

  // scanAndConnect() {
  //   this.manager.startDeviceScan(null, null, (error, device) => {
  //     console.log('Scanning...');
  //     this.setState({bleState: 'Scanning...'});

  //     // console.log(device.id);
  //     if (error) {
  //       // Handle error (scanning will be stopped automatically)
  //       //  alert('Some error',error)
  //       console.log('Some error');
  //       return;
  //     }

  //     // Check if it is a device you are looking for based on advertisement data
  //     // or other criteria.
  //     if (
  //       device.name === 'TI BLE Sensor Tag' ||
  //       device.name === 'SensorTag' ||
  //       device.name
  //     ) {
  //       console.log('FoundName3:I' + device.name + 'I');
  //       console.log('FoundLocalName: ', device.localName);
  //       console.log('isConnectable:', device.isConnectable);
  //       //  console.log('Services?',this.manager.servicesForDevice(device.id).then(res))

  //       // this.manager.readCharacteristicForService()
  //       // Stop scanning as it's not necessary if you are scanning for one device.

  //       console.log('Here1.0');
  //       if (device.name == 'Anthony’s iPhone') {
  //         console.log('Here1.1');
  //         this.setState({bleState: 'Trying to connect to:' + device.name});
  //         this.manager.stopDeviceScan();
  //         // this.manager.connectToDevice(device.id).then(res => {
  //         //   console.log('Res1:',res)
  //         // })
  //         device
  //           .connect()
  //           .then((device) => {
  //             //  var something = device.discoverAllServicesAndCharacteristics()
  //             //  console.log('Attempting2...4')
  //             this.setState({bleState: 'Connected to:' + device.name});
  //             // console.log('Discovering services and characteristics',something);
  //             return device.discoverAllServicesAndCharacteristics();
  //           })
  //           .then((device) => {
  //             this.setupNotifications(device);
  //             // device.readCharacteristicForService('service uuid', 'characteristic uuid')
  //             // .then(characteristic => console.log('Characteristic!'+characteristic.value))
  //             // console.log('Device chars:',something)
  //             //  console.log('something', something.val)
  //             //  this.setState({bleState: 'Connected to:'+ device.name})
  //             //    console.log('Connected to(id)', device.id)
  //             //    device.writeCharacteristicWithoutResponseForService(device.id, device.id, 'SGVsbG8h')
  //             //     .then((characteristic) => {
  //             //       console.log('Here!',characteristic.value);
  //             //       return
  //             //     })
  //           });
  //         // .then(
  //         //   () => {
  //         //      console.log('Listening...');
  //         //   },
  //         //   (error) => {
  //         //     this.error(error.message);
  //         //   },);

  //         // Proceed with connection.
  //       }
  //     }
  //   });
  //   // /////////
  // }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
      // if()
      console.log('NEW STATE', state);
      if (state === 'PoweredOn') {
        console.log('PoweredOn');
        this.setState({bleState: 'PoweredOn'});
        // this.scan()
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }
  // async setupNotifications(device) {
  //   console.log('inside: setupNotifications');
  //   for (const id in this.sensors) {
  //     const service = this.serviceUUID(id);
  //     const characteristicW = this.writeUUID(id);
  //     const characteristicN = this.notifyUUID(id);

  //     const characteristic = await device.writeCharacteristicWithResponseForService(
  //       service,
  //       characteristicW,
  //       'AQ==' /* 0x01 in hex */,
  //     );

  //     device.monitorCharacteristicForService(
  //       service,
  //       characteristicN,
  //       (error, characteristic) => {
  //         if (error) {
  //           this.error(error.message);
  //           return;
  //         }
  //         this.updateValue(characteristic.uuid, characteristic.value);
  //       },
  //     );
  //   }
  // }
  notifyUUID(num) {
    return this.prefixUUID + num + '1' + this.suffixUUID;
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
