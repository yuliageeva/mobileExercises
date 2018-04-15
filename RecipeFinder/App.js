import React from 'react';
import { StyleSheet, Text, Image, View, Button, TextInput, FlatList, Alert, StatusBar } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {recipes: [], ingredient: '', }
  }

  getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api?i='+this.state.ingredient;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({recipes: responseJson.results});
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  listSeparator = () => {
    return (
      <View
          style= {{
            height:1,
            width: '80%',
            backgroundColor: '#CED0CE',
            marginLeft: '10%'
          }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList
          style={{marginLeft:'5%'}}
          keyExtractor={item => item.title} 
          renderItem={({item}) => <Text style={{fontSize: 18}}>{item.title} {"\n"}
          < Image style={{width:50, height:50}} source ={{uri:item.thumbnail}} /></Text>} data={this.state.recipes} 
          
          ItemSeparatorComponent={this.listSeparator} /> 

          <Button title="Find" onPress={this.getRecipes} />
        <TextInput style={{fontSize: 18, width: 200}} placeholder='ingredient' onChangeText={(ingredient) => this.setState({ingredient})} />
        
        
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
