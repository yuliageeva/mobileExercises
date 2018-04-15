import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {myNumber:'',number:'',result:0}
  }

 
  render() {

    return (
      <View style={styles.container}>    
        
        <Text>{`Result ${this.state.result}`}</Text>
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1, margin: 10}}
          onChangeText={(myNumber) => this.setState({myNumber})}
          value ={this.state.myNumber}
          keyboardType={'numeric'}
        />
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(number) => this.setState({number})}
          value ={this.state.number}
          keyboardType={'numeric'}
        />
        <View style={{flexDirection:'row'}} >
          <Button onPress={this.buttonSum} title="+" />
          <Button onPress={this.buttonMinus} title="-" />
        </View> 
        
      </View>   
  
    );
    
  }
 
   buttonSum = () => {
      const {myNumber, number} = this.state;

      this.setState({
        result: Number(myNumber) + Number(number)
      });
   }

   buttonMinus = () => {
    const {myNumber, number} = this.state;

    this.setState({
      result: Number(myNumber) - Number(number)
    });
 }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alerttext: {
    fontSize:18,
    color:'blue'
  }
});

