import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Colors from './src/components/Constants/Colors';
import Navigator from './src/components/Navigator/Navigator';
import { CommonContextProvider } from './src/Context/CommonContextProvider';
import Layout from './src/Screens/Layout/Layout'

export default function App() {
  return (
    <CommonContextProvider>
      <StatusBar translucent backgroundColor={Colors.primaryBlue}/>
      <Layout>
        <Navigator/>
      </Layout>
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
