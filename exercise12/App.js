import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';
import Expo,{SQLite} from 'expo';

const db = SQLite.openDatabase('shoppingdb.db');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {product:'',amount:'', shoppingList: []};
  }

 componentDidMount() {
  //Create shoppingList table
  db.transaction(tx => {
    tx.executeSql('create table if not exists shopping (id integer primary key not null, product text, amount text);');
  });
  this.updateList();
 }

  saveItem = () => {
   db.transaction(tx => {
     tx.executeSql('insert into shopping (product, amount) values (?,?)',
        [this.state.product, this.state.amount]);
   }, null, this.updateList)
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping', [], (_, {rows}) =>
        this.setState({shoppingList: rows._array})
      );
    });  
  }

deleteItem = (id) => {
  db.transaction(tx => 
    {tx.executeSql('delete from shopping where id = ?;', [id]);
    }, 
  null, this.updateList)
}

listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
};

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.textfield}>
        <TextInput style={{width: 200, height:30, borderColor: 'gray', borderWidth: 1}} placeholder='product'
          onChangeText={(product) => this.setState({product})}
          value= {this.state.product} />
        <TextInput style={{width: 200, height:30, borderColor: 'gray', borderWidth: 1}} placeholder='amount'
          onChangeText={(amount) => this.setState({amount})}
          value= {this.state.amount} />
        <View style={{flexDirection:'row'}} >
          <Button onPress={this.saveItem} title="Save" />
        </View>
      </View>
      
        <Text style={{color:'darkorange'}}>Shopping List:</Text>
        <FlatList style = {{marginLeft : '0%'}} 
        keyExtractor={item => item.id}
        data={this.state.data}
        renderItem={({item}) =>
        <View style ={styles.flatlist}>
        <Text>{item.product}, {item.amount}</Text>
        <Text style={{color: '#0000ff'}} onPress={() => this.deleteItem(item.id)}> bought</Text>
        </View>}
        data={this.state.shoppingList} ItemSeparatorComponent={this.listSeparator} 
        />           
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
    flexDirection: 'row',
    backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  }
});
