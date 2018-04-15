import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {MapView} from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={address:'',restaurants:[], receivedLat:60.200692, receivedLng:24.934302,region: {
      latitude:60.200692,
      longitude:24.934302,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221,}};
  }
  buttonFind = () =>{
    var address = this.state.address.split(' ').join('+');
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCcyD-15zZcSt1EAvunDE7upLHCOu92_BQ';
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({receivedLat: responseJson.results[0].geometry.location.lat});
        this.setState({receivedLng: responseJson.results[0].geometry.location.lng});
        console.log("Lat "+this.state.receivedLat);
        console.log("Lng "+this.state.receivedLng);
        var newRegion = {
          latitude: this.state.receivedLat,
          longitude: this.state.receivedLng,
          latitudeDelta:0.0322,
          longitudeDelta:0.0221,
        }
        this.setState({region: newRegion});
        this.showRestaurants();
      })

      .catch((error) => {
        console.log(error);
        //Alert.alert(error);
      });
      
  }
  showRestaurants=() => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.state.receivedLat+','+this.state.receivedLng +'&radius=500&type=restaurant'+'&key=AIzaSyCcyD-15zZcSt1EAvunDE7upLHCOu92_BQ';
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // var restaurantObj = {}; 
        // for(var i = 0; i < responseJson.results.length; i++)
        // {
        //   restaurantObj.lat = responseJson.results[i].geometry.location.lat;
        //   restaurantObj.lng = responseJson.results[i].geometry.location.lng;
        //   restaurantObj.title = responseJson.results[i].name;
        //   restaurantObj.description = responseJson.results[i].vicinity;
        //   this.state.restaurants.push(restaurantObj);
        //   console.log(restaurantObj);
        //   restaurantObj = {};
        // }

        this.setState({
          restaurants: responseJson.results
        });
        
      })
  }

  render() {
    
    return (
      <View style={styles.container}>
        <MapView style={styles.map} 
        region={this.state.region}>
        <MapView.Marker 
          coordinate={{latitude:this.state.receivedLat, longitude: this.state.receivedLng}}title=''/>
        {this.state.restaurants.map(marker => (
          <MapView.Marker
            // coordinate={{latitude:marker.lat, longitude: marker.lng}}
            // title={marker.title}
            // description={marker.description}
            key={marker.id}
            coordinate={{latitude:marker.geometry.location.lat, longitude:marker.geometry.location.lng}}
            title={marker.name}
            description={marker.vicinity}          
          />
        ))}
        </MapView>

        <TextInput style={{width: '100%', height:30, borderColor: 'blue', borderWidth: 1, margin: 10}} 
        onChangeText={(address) => this.setState({address})}
          value={this.state.address} />

        <Button onPress={this.buttonFind} title="FIND" />
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
    bottom:100,

  }
});
