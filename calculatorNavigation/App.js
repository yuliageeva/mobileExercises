import React from 'react';
import {StackNavigator} from 'react-navigation';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image, FlatList } from 'react-native';
import CalculatorPage from './CalculatorPage';
import HistoryPage from './HistoryPage';


export default class App extends React.Component {
  

  render() {
    const MyApp = StackNavigator({
      Calculator: {screen: CalculatorPage},
      History: {screen: HistoryPage}
    });
    return <MyApp/>;
  }
  
}




