import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CommonContextProvider } from './src/Context/CommonContextProvider';

// Views
import { Home } from './src/Views';

export default function App() {
  return (
    <CommonContextProvider>
      <View style={styles.container}>
        <Home/>
        <StatusBar style="auto" />
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
