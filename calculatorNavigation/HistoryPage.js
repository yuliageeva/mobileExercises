import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';

export default class HistoryPage extends React.Component {
    static navigateOptions = {title: 'History',};
    
    

    render (){
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
        <View style={styles.flatlist}>
        <Text style={{margin:10, fontSize:24}}>History</Text>
        {<FlatList data={params.data}
        renderItem={({item}) =>
        <Text>{item.key}</Text>}/>}

          </View>
        );
    }
}

const styles = StyleSheet.create({
      
    flatlist: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
  
  
  