import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Components
import { CustomButton } from './src/components';

// Views
import { Home, Tutorial } from './src/Views';

export default function App() {
  const [step, setStep] = React.useState(1);
  const [isTutorialActive, setIsTutorialActive] = React.useState(false);

  return (
    <View style={styles.container}>
        {
          !isTutorialActive ?
            <Tutorial step={step} setStep={setStep}/> :
            <Home/>
        }
      <CustomButton 
        text={!isTutorialActive ? "Saltar" : "Ver tutorial"}
        onPress={() => setIsTutorialActive(!isTutorialActive)}
      />
      <StatusBar style="auto" />
    </View>
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
