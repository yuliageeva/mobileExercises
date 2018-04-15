import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {myItem:'',list:'', data: []}
  }

  buttonAdd = () => {
    const {myItem} = this.state;
    this.setState({
      data: [...this.state.data,
      {key: myItem}],
    });
  }

  buttonClear = () => {
    this.setState({data: []
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.textfield}>
        <TextInput style={{width: 200, height:30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(myItem) => this.setState({myItem})}
          value= {this.state.text} />
        <View style={{flexDirection:'row'}} >
          <Button onPress={this.buttonAdd} title="ADD" />
          <Button onPress={this.buttonClear} title="CLEAR" />
        </View>
      </View>
      <View style ={styles.flatlist}>
        <Text style={{color:'blue'}}>Shopping List:</Text>
        <FlatList data={this.state.data}
        renderItem={({item}) =>
        <Text>{item.key}</Text>}/>
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
    justifyContent: 'center',
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
