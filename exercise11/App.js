import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {MapView, Permissions, Location} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={address:'', receivedLat:60.200692, receivedLng:24.934302,region: 
      null};
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation = async() => {
    //Check permission
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({location});
    }
    this.setState({receivedLat: this.state.location.coords.latitude});
    this.setState({receivedLng: this.state.location.coords.longitude});
  
    var newRegion = {
      latitude: this.state.receivedLat,
      longitude: this.state.receivedLng,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221,
    }
    this.setState({region: newRegion});
  }


  render() {
    
    return (
      <View style={styles.container}>
        <MapView style={styles.map} 
        region={this.state.region}>
        <MapView.Marker 
          coordinate={{latitude:this.state.receivedLat, longitude: this.state.receivedLng}}title=''/>
        </MapView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    bottom:0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    bottom:0,

  }
});
