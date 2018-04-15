import React from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Image, FlatList } from 'react-native';
import Expo,{SQLite} from 'expo';
import {FormLabel, FormInput, Button, List, ListItem, Header} from 'react-native-elements';

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
      <View style={{marginTop:0}}>
      <Header
      outerContainerStyles={{ backgroundColor: 'orange' }}
      innerContainerStyles={{ justifyContent: 'space-around' }}
      centerComponent={{text:'SHOPPING LIST', style:{color:'white', fontSize:20}}} />
      <FormLabel style={{display:'block'}}>Product</FormLabel>
        <FormInput placeholder='product'
          onChangeText={(product) => this.setState({product})}
          value= {this.state.product} />
      <FormLabel>Amount</FormLabel>
        <FormInput placeholder='amount'
          onChangeText={(amount) => this.setState({amount})}
          value= {this.state.amount} />
          <Button style ={{padding:'5%'}} onPress={this.saveItem} title="SAVE" />
    
      
        
        <List>
          <FlatList
          keyExtractor={item => item.id}
          data={this.state.shoppingList}
          renderItem={({item}) =>
            <ListItem
              title= {`${item.product}
              ${item.amount}`}
              subtitle={
              <Text style={{color: 'orange',textAlign:'right'}} onPress={() => this.deleteItem(item.id)}> bought</Text>
              }
            />}
            />
         </List>
            
      </View>
    );
  }
}


