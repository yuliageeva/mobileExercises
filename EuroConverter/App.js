import React from 'react';
import { StyleSheet, Text, Image, View, Button, TextInput, FlatList, Alert, StatusBar, Picker } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={currency:'', valueGroups:[], myNumber:0,output:0}
  }

  convert = () => {
    const {myNumber, currency} = this.state;
    const output =Number(myNumber)*Number(currency);
    this.setState({
      output: output
    });
  }
  componentWillMount(){
    const url ='https://api.fixer.io/latest';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({valueGroups: responseJson.rates});
      })
        .catch((error) => {
          Alert.alert(error);
        });
      
  }
  render() {
     const groups = Object.keys(this.state.valueGroups).map((key) => {
       return<Picker.Item key={key} value={this.state.valueGroups[key]} label={key}/>
     });

    return (
      <View style={styles.container}>
      <Text> {this.state.output} </Text>
      <TextInput style={{fontSize: 18, width: 200}} placeholder='myNumber' onChangeText={(myNumber) => this.setState({myNumber})} />
        { <Picker style={{width:'80%'}}
          selectedValue={this.state.currency}
          onValueChange={itemValue => this.setState({currency: itemValue})}>
          {groups}
        </Picker> }
        
        <Button title="Convert" onPress={this.convert} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
