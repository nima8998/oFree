import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Colors from './src/components/Constants/Colors';
import { CommonContextProvider } from './src/Context/CommonContextProvider';
import {Initial} from './src/Screens';

export default function App() {
  return (
    <CommonContextProvider>
      <View style={styles.container}>
        <StatusBar translucent  backgroundColor={Colors.primaryBlue}/>
        <Initial/>
      </View>
    </CommonContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  }
});
