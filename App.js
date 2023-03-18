import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Colors from './src/components/Constants/Colors';
import Navigator from './src/components/Navigator/Navigator';
import { CommonContextProvider } from './src/Context/CommonContextProvider';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <CommonContextProvider>
      <NativeBaseProvider>
        <StatusBar translucent backgroundColor={Colors.primaryBlue}/>
        <Navigator/>
      </NativeBaseProvider>
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
