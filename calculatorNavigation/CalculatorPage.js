import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';


export default class CalculatorPage extends React.Component {
  static navigateOptions = {title: 'Calculator',};
  constructor(props){
    super(props);
    this.state = {myNumber:'',number:'',result:0, data: [],resultText:''}
  }

  buttonSum = () => {
      const {myNumber, number} = this.state;
      const result = Number(myNumber) + Number(number);
      const resultText= myNumber + "+" + number + "=" + result;
      this.setState({
        result: result,
        data: [...this.state.data,
        {key: resultText}], 
      });

   }

   buttonMinus = () => {
    const {myNumber, number} = this.state;
    const result = Number(myNumber) - Number(number);
    const resultText= myNumber + "-" + number + "=" + result;
    this.setState({
      result: result,
      data: [...this.state.data,
        {key: resultText}]
    });
 }

 
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>    
        <View style={styles.textfield}>
        <Text>Result: {this.state.result} </Text>

        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(myNumber) => this.setState({myNumber})}
          keyboardType={'numeric'}
        />
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(number) => this.setState({number})}
          keyboardType={'numeric'}
        />
        <View style={{flexDirection:'row'}} >
          <Button onPress={this.buttonSum} title="+" />
          <Button onPress={this.buttonMinus} title="-" />
          <Button onPress={() => navigate('History', {data: this.state.data})} title="History" />
        </View>
        </View>
      </View>   
    
    );
    
  }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textfield: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
  flatlist: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  }
});


