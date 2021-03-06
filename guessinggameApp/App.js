import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, AsyncStorage, Alert } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {myNumber:'',
    message:'Guess a number between 1-100',
    count:0, myKey:null,
    guessNumber: ((min, max)=>{
    return Math.floor(Math.random() * 10) + 1;}) (1,10)
  }
  this.correctGuess = this.correctGuess.bind(this);
  }

  

 
  render() {

    return (
      <View style={styles.container}>   
       
        <View>
          {console.log(this.state.message)}
        <Text>{this.state.message}</Text>
        <TextInput style={{width: 100, borderColor: 'gray', borderWidth: 1, margin: 10}}
          onChangeText={(myNumber) => this.setState({myNumber})}
          value ={this.state.myNumber}
          keyboardType={'numeric'}
        />
        <Button onPress={this.buttonGuess} title="Make a guess" />
        <Text> Highscore: {this.state.myKey} guesses </Text>
        </View> 
      </View> 

    );
    
  }
  componentDidMount (){
    this.getKey();
  }
  generateNumber = () => {
    this.state.guessNumber = ((min, max)=>{
      return Math.floor(Math.random() * 10) + 1;}) (1,10)
    
    }
   
   buttonGuess = () => {
      
      let message = null;

      if(this.state.guessNumber == this.state.myNumber)
      {
        message = 'Guess a number between 1-100';
        this.correctGuess();
      }
      else if (this.state.guessNumber > this.state.myNumber)
      {
        message = 'Your guess '+ this.state.myNumber+' is too low';
      }
      else
      {
        message = 'Your guess ' + this.state.myNumber +' is too high';
      }

      this.setState({message});
      this.state.count++;
      this.setState({myNumber:''});
   }

   correctGuess = () => {
      this.state.count++;
      this.generateNumber();
      console.log(this.state.message);
      

      Alert.alert(
        'You Win!',
        'You guessed the number in '+ this.state.count +' guesses',
        [
          {text: 'Play Again'},
        ],
        { cancelable: false }
      )
      
      this.getKey();
      this.setState({count: 0});
   }

 getKey=async() => {
  try {
    let highscore = this.state.count;
    console.log("hiscore"+highscore);
    
    let value = await AsyncStorage.getItem('myKey');
    console.log("val"+value);
    if(value ==0){
      AsyncStorage.setItem('myKey', JSON.stringify(highscore));
      this.setState({myKey: Number(highscore)});
      console.log("s0"+this.state.myKey);
    }

    if (value>highscore){
      AsyncStorage.setItem('myKey', JSON.stringify(highscore));
      this.setState({myKey: Number(highscore)});
      console.log(this.state.myKey);
    }

   } catch (error) {
     console.log("Error retrieving data" + error);
  }
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



