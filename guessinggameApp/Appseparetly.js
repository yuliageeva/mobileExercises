import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, AsyncStorage, Alert } from 'react-native';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {myNumber:'',
    message:'Guess a number between 1-100',
    count:0, 
    highscore:0,
    guessNumber: ((min, max)=>{
    return Math.floor(Math.random() * 100) + 1;}) (1,100)
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
        <Text> Highscore: {this.state.highscore} guesses </Text>
        </View> 
      

        
        {/* { !this.state.game && 
            <Button onPress={this.guessAgain.bind(this)} title="Guess again" />
        } */}
          
          
        
        </View> 
        
        
  
    );
    
  }

  generateNumber = () => {
    this.state.guessNumber = ((min, max)=>{
      return Math.floor(Math.random() * 100) + 1;}) (1,100)
    
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
      // this.setState({game: this.state.guessNumber != this.state.myNumber});
      this.state.count++;
      this.setState({myNumber:''});
   }

   correctGuess = () => {
     this.state.count++;
      //Alert.alert('You guessed the number in '+ this.state.count +' guesses');
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
  }

    try{
        await AsyncStorage.setItem(highscore, this.state.count);
    } catch(error) {
        ALert.alert('Error saving data');
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



